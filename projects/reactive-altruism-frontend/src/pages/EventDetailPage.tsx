import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  // TODO: Fetch event details using eventId

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Event Details</h1>
      <div className="card p-6">
        <p className="text-gray-700 mb-2">Event ID: <span className="font-mono">{eventId}</span></p>
        {/* Render more detailed event info here */}
        <p className="text-gray-500">Detailed donation and event information will appear here.</p>
      </div>
    </div>
  );
};

export default EventDetailPage;
