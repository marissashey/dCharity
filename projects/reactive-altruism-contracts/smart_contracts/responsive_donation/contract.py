from algopy import (
    ARC4Contract,
    BoxMap,
    Global,
    Txn,
    arc4,
    gtxn,
    itxn,
    op,
    urange,
)
from algopy.arc4 import abimethod


# EventStruct definition
class EventStruct(arc4.Struct):
    """
    EventStruct

    Represents an event that can be used for conditional donations.
    This struct is stored in a BoxMap, allowing efficient lookup and update by event ID.

    Fields:
    - event_id: Unique identifier for the event
    - event_string: Description/name of the event
    - pending: Whether the event outcome is still pending
    - resolution: The outcome of the event (true/false) - only valid when pending=false
    - oracle_address: Address authorized to resolve this event
    """
    event_id: arc4.UInt64
    event_string: arc4.String
    pending: arc4.Bool
    resolution: arc4.Bool
    oracle_address: arc4.Address


class ConditionalClauseStruct(arc4.Struct):
    """
    ConditionalClauseStruct
    
    Represents a conditional donation clause: "If event resolves to X, send amount to recipient_yes, else send to recipient_no"
    
    Fields:
    - clause_id: Unique identifier for this clause
    - event_id: Reference to the event this clause depends on
    - payout_amount: Amount to be paid out (in microAlgos)
    - recipient_yes: Address to receive funds if event resolves to true
    - recipient_no: Address to receive funds if event resolves to false
    - donor_address: Address of the person who created this conditional clause
    - executed: Whether this clause has been executed
    """
    clause_id: arc4.UInt64
    event_id: arc4.UInt64
    payout_amount: arc4.UInt64
    recipient_yes: arc4.Address
    recipient_no: arc4.Address
    donor_address: arc4.Address
    executed: arc4.Bool


class ResponsiveDonation(ARC4Contract):
    """
    ResponsiveDonation Contract - MVP Version
    
    A smart contract enabling conditional charitable donations based on real-world events.
    Perfect for disaster relief, climate action, and cause-based giving.
    
    Core Features:
    1. 💰 Instantaneous Donations - Direct donations with immediate payout
    2. 🎯 Conditional Donations - "Donate $1000 to Red Cross IF hurricane hits Miami"
    3. 🔮 Oracle Resolution - Trusted oracles resolve event outcomes
    4. 🚀 Mixed Donations - Combine instant + conditional in one transaction
    5. 📊 Query Interface - Discover events and clauses
    
    Use Cases:
    - Climate disaster relief (donate if hurricane/wildfire occurs)
    - Charity matching (donate if fundraising goal is met)
    - Sports betting for good (donate to charity if team wins)
    - Political action (donate if legislation passes)
    """
    
    def __init__(self) -> None:
        # BoxMap for events (key: event ID, value: EventStruct)
        self.listed_events = BoxMap(
            arc4.UInt64, 
            EventStruct,
            key_prefix="events"
        )
        
        # BoxMap for conditional clauses (key: clause ID, value: ConditionalClauseStruct)
        self.conditional_clauses = BoxMap(
            arc4.UInt64,
            ConditionalClauseStruct,
            key_prefix="clauses"
        )
        
        # BoxMap for event->clause indexing (key: event ID, value: array of clause IDs)
        self.event_clauses = BoxMap(
            arc4.UInt64,
            arc4.DynamicArray[arc4.UInt64],
            key_prefix="event_clauses"
        )
    
    @abimethod()
    def create_event(
        self,
        event_string: arc4.String,
        oracle_address: arc4.Address
    ) -> arc4.UInt64:
        """
        Create a new event that can be used for conditional donations.
        
        Args:
            event_string: Description of the event (e.g., "Hurricane hits Miami")
            oracle_address: Address authorized to resolve this event
            
        Returns:
            The event ID of the created event (uint64)
        """
        # Use timestamp as unique event ID
        event_id = arc4.UInt64(Global.latest_timestamp)
        
        # Create and store the event struct
        self.listed_events[event_id] = EventStruct(
            event_id=event_id,
            event_string=event_string,
            pending=arc4.Bool(True),
            resolution=arc4.Bool(False),  # Default resolution, not meaningful until pending=false
            oracle_address=oracle_address
        )
        
        return event_id
    
    @abimethod()
    def instantaneous_payout(
        self,
        recipient_address: arc4.Address,
        payment: gtxn.PaymentTransaction
    ) -> bool:
        """
        Process an immediate donation with instant payout to recipient.
        Perfect for direct charitable giving with immediate impact.
        
        Args:
            recipient_address: Address to receive the donation (charity/recipient)
            payment: The payment transaction (must be grouped with the app call)
            
        Returns:
            True if the donation is successful
        """
        # Validate the payment transaction
        assert payment.receiver == Global.current_application_address, "Payment must be sent to contract"
        assert payment.sender == Txn.sender, "Payment sender must match transaction sender"
        assert payment.amount > 0, "Payment amount must be greater than 0"
        assert payment.amount >= 1000, "Minimum donation is 1000 microAlgos (0.001 ALGO)"
        
        # Immediately transfer the funds to the recipient
        itxn.Payment(
            amount=payment.amount,
            receiver=recipient_address.native,
            fee=0,
        ).submit()
        
        return True
    
    @abimethod()
    def create_conditional_donation(
        self,
        event_id: arc4.UInt64,
        recipient_yes: arc4.Address,
        recipient_no: arc4.Address,
        payment: gtxn.PaymentTransaction
    ) -> arc4.UInt64:
        """
        Create a conditional donation that will pay out based on event resolution.
        Example: "Donate $1000 to Red Cross IF hurricane hits Miami, otherwise return to me"
        
        Args:
            event_id: The event this donation depends on
            recipient_yes: Address to receive funds if event resolves to true
            recipient_no: Address to receive funds if event resolves to false (often donor)
            payment: The payment transaction (funds held in escrow)
            
        Returns:
            The clause ID of the created conditional donation
        """
        # Ensure the event exists and is still pending
        assert event_id in self.listed_events, "Event does not exist"
        event_struct = self.listed_events[event_id].copy()
        assert event_struct.pending.native, "Event has already been resolved"
        
        # Validate the payment transaction
        assert payment.receiver == Global.current_application_address, "Payment must be sent to contract"
        assert payment.sender == Txn.sender, "Payment sender must match transaction sender"
        assert payment.amount > 0, "Payment amount must be greater than 0"
        
        # Use timestamp + hash of sender for unique clause ID to avoid collisions
        sender_hash = op.sha256(Txn.sender.bytes)
        clause_id = arc4.UInt64(Global.latest_timestamp + op.btoi(sender_hash[:8]))
        
        # Create and store the conditional clause
        self.conditional_clauses[clause_id] = ConditionalClauseStruct(
            clause_id=clause_id,
            event_id=event_id,
            payout_amount=arc4.UInt64(payment.amount),
            recipient_yes=recipient_yes,
            recipient_no=recipient_no,
            donor_address=arc4.Address(Txn.sender),
            executed=arc4.Bool(False)
        )
        
        # Add clause to event index for efficient lookup
        if event_id in self.event_clauses:
            existing_clauses = self.event_clauses[event_id].copy()
            existing_clauses.append(clause_id)
            self.event_clauses[event_id] = existing_clauses.copy()
        else:
            # Create new array with this clause
            new_clause_array = arc4.DynamicArray[arc4.UInt64](clause_id)
            self.event_clauses[event_id] = new_clause_array.copy()
        
        return clause_id
    
    @abimethod()
    def mixed_donation(
        self,
        instant_recipient: arc4.Address,
        instant_amount: arc4.UInt64,
        event_id: arc4.UInt64,
        recipient_yes: arc4.Address,
        recipient_no: arc4.Address,
        payment: gtxn.PaymentTransaction
    ) -> arc4.UInt64:
        """
        Create both instantaneous and conditional donations in a single transaction.
        Simplified version that handles one conditional donation to keep it simple.
        
        Args:
            instant_recipient: Address to receive instant donation (use zero address if no instant donation)
            instant_amount: Amount for instant donation (use 0 if no instant donation)
            event_id: Event ID for conditional donation
            recipient_yes: Address to receive funds if event resolves to true
            recipient_no: Address to receive funds if event resolves to false
            payment: The payment transaction covering both donations
            
        Returns:
            The clause ID for the conditional donation created
        """
        # Validate the payment transaction
        assert payment.receiver == Global.current_application_address, "Payment must be sent to contract"
        assert payment.sender == Txn.sender, "Payment sender must match transaction sender"
        assert payment.amount > 0, "Payment amount must be greater than 0"
        
        # Calculate total required amount
        conditional_amount = arc4.UInt64(payment.amount - instant_amount.native)
        assert conditional_amount.native > 0, "Conditional amount must be greater than 0"
        
        total_required = instant_amount.native + conditional_amount.native
        assert payment.amount == total_required, "Payment amount must equal sum of donations"
        
        # Process instant donation if specified
        if instant_amount.native > 0:
            itxn.Payment(
                amount=instant_amount.native,
                receiver=instant_recipient.native,
                fee=0,
            ).submit()
        
        # Validate event exists and is pending for conditional donation
        assert event_id in self.listed_events, "Event does not exist"
        event_struct = self.listed_events[event_id].copy()
        assert event_struct.pending.native, "Event has already been resolved"
        
        # Create conditional clause with unique ID
        sender_hash = op.sha256(Txn.sender.bytes)
        clause_id = arc4.UInt64(Global.latest_timestamp + op.btoi(sender_hash[:8]) + 1)
        
        self.conditional_clauses[clause_id] = ConditionalClauseStruct(
            clause_id=clause_id,
            event_id=event_id,
            payout_amount=conditional_amount,
            recipient_yes=recipient_yes,
            recipient_no=recipient_no,
            donor_address=arc4.Address(Txn.sender),
            executed=arc4.Bool(False)
        )
        
        # Add clause to event index for efficient lookup
        if event_id in self.event_clauses:
            existing_clauses = self.event_clauses[event_id].copy()
            existing_clauses.append(clause_id)
            self.event_clauses[event_id] = existing_clauses.copy()
        else:
            # Create new array with this clause
            new_clause_array = arc4.DynamicArray[arc4.UInt64](clause_id)
            self.event_clauses[event_id] = new_clause_array.copy()
        
        return clause_id
    
    @abimethod()
    def resolve_event(
        self,
        event_id: arc4.UInt64,
        resolution: arc4.Bool
    ) -> bool:
        """
        Resolve an event outcome. Can only be called by the authorized oracle.
        
        Args:
            event_id: The event to resolve
            resolution: The outcome of the event (true/false)
            
        Returns:
            True if the event is successfully resolved
        """
        # Ensure the event exists
        assert event_id in self.listed_events, "Event does not exist"
        
        event_struct = self.listed_events[event_id].copy()
        
        # Ensure the event is still pending
        assert event_struct.pending.native, "Event has already been resolved"
        
        # Ensure the caller is the authorized oracle
        assert Txn.sender == event_struct.oracle_address.native, "Only authorized oracle can resolve event"
        
        # Update the event struct
        event_struct.pending = arc4.Bool(False)
        event_struct.resolution = resolution
        self.listed_events[event_id] = event_struct.copy()
        
        return True
    
    @abimethod()
    def execute_conditional_clause(
        self,
        clause_id: arc4.UInt64
    ) -> bool:
        """
        Execute a conditional clause after its associated event has been resolved.
        Can be called by anyone to trigger payouts.
        
        Args:
            clause_id: The clause to execute
            
        Returns:
            True if the clause is successfully executed
        """
        # Ensure the clause exists
        assert clause_id in self.conditional_clauses, "Clause does not exist"
        
        clause_struct = self.conditional_clauses[clause_id].copy()
        
        # Ensure the clause hasn't been executed yet
        assert not clause_struct.executed.native, "Clause has already been executed"
        
        # Get the associated event
        assert clause_struct.event_id in self.listed_events, "Associated event does not exist"
        event_struct = self.listed_events[clause_struct.event_id].copy()
        
        # Ensure the event has been resolved
        assert not event_struct.pending.native, "Event has not been resolved yet"
        
        # Determine recipient based on event resolution
        if event_struct.resolution.native:
            recipient = clause_struct.recipient_yes.native
        else:
            recipient = clause_struct.recipient_no.native
        
        # Execute the payout
        itxn.Payment(
            amount=clause_struct.payout_amount.native,
            receiver=recipient,
            fee=0,
        ).submit()
        
        # Mark the clause as executed
        clause_struct.executed = arc4.Bool(True)
        self.conditional_clauses[clause_id] = clause_struct.copy()
        
        return True
    
    @abimethod()
    def execute_clauses_for_event(
        self,
        event_id: arc4.UInt64
    ) -> arc4.UInt64:
        """
        Execute all unexecuted conditional clauses for a resolved event.
        This is more gas-efficient than executing clauses one by one.
        
        Args:
            event_id: The event whose clauses should be executed
            
        Returns:
            Number of clauses executed
        """
        # Ensure the event exists and is resolved
        assert event_id in self.listed_events, "Event does not exist"
        event_struct = self.listed_events[event_id].copy()
        assert not event_struct.pending.native, "Event has not been resolved yet"
        
        # Get all clauses for this event
        if event_id not in self.event_clauses:
            # No clauses to execute
            return arc4.UInt64(0)
        
        clause_ids = self.event_clauses[event_id].copy()
        executed_count = arc4.UInt64(0)
        
        # Execute each unexecuted clause
        for i in urange(clause_ids.length):
            clause_id = clause_ids[i]
            
            if clause_id in self.conditional_clauses:
                clause_struct = self.conditional_clauses[clause_id].copy()
                
                # Skip if already executed
                if clause_struct.executed.native:
                    continue
                
                # Determine recipient based on event resolution
                if event_struct.resolution.native:
                    recipient = clause_struct.recipient_yes.native
                else:
                    recipient = clause_struct.recipient_no.native
                
                # Execute the payout
                itxn.Payment(
                    amount=clause_struct.payout_amount.native,
                    receiver=recipient,
                    fee=0,
                ).submit()
                
                # Mark the clause as executed
                clause_struct.executed = arc4.Bool(True)
                self.conditional_clauses[clause_id] = clause_struct.copy()
                executed_count = arc4.UInt64(executed_count.native + 1)
        
        return executed_count
    
    @abimethod(readonly=True)
    def get_event_info(
        self,
        event_id: arc4.UInt64
    ) -> EventStruct:
        """
        Get information about an event.
        
        Args:
            event_id: The event ID to query
            
        Returns:
            The EventStruct containing the event's information
        """
        assert event_id in self.listed_events, "Event does not exist"
        return self.listed_events[event_id]
    
    @abimethod(readonly=True)
    def get_clause_info(
        self,
        clause_id: arc4.UInt64
    ) -> ConditionalClauseStruct:
        """
        Get information about a conditional clause.
        
        Args:
            clause_id: The clause ID to query
            
        Returns:
            The ConditionalClauseStruct containing the clause's information
        """
        assert clause_id in self.conditional_clauses, "Clause does not exist"
        return self.conditional_clauses[clause_id]
    
    @abimethod(readonly=True)
    def get_pending_events(self) -> arc4.DynamicArray[arc4.UInt64]:
        """
        Get all pending event IDs. Oracle can use this to know which events to monitor.
        Note: This is a simplified version - in production you'd want pagination
        for large numbers of events.
        
        Returns:
            Array of pending event IDs (empty for now - placeholder for interface)
        """
        # Note: In practice, you'd implement this more efficiently with indexing
        # This is a simplified version for demonstration that shows the interface
        pending_events = arc4.DynamicArray[arc4.UInt64]()
        
        # This would require iteration through box storage in a real implementation
        # For now, this is a placeholder that shows the interface
        return pending_events
    
    @abimethod(readonly=True)
    def get_clauses_for_event(
        self,
        event_id: arc4.UInt64
    ) -> arc4.DynamicArray[arc4.UInt64]:
        """
        Get all clause IDs that depend on a specific event.
        Oracle can call this when resolving an event to get all clauses to execute.
        
        Args:
            event_id: The event to get clauses for
            
        Returns:
            Array of clause IDs that depend on this event
        """
        # Return indexed clauses for this event
        if event_id in self.event_clauses:
            return self.event_clauses[event_id].copy()
        else:
            # No clauses for this event
            return arc4.DynamicArray[arc4.UInt64]()