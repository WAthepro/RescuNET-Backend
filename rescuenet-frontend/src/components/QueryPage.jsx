import React, { useState } from 'react';

const QueryPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setResponse(data.response || 'No response from server.');
    } catch (error) {
      setResponse('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Ask RescuNet</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <label htmlFor="query" className="block text-gray-700 font-medium mb-2">
          Your Question
        </label>
        <textarea
          id="query"
          className="w-full h-28 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter your question here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <div className="mt-8 w-full max-w-md">
        {response && (
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="font-semibold text-gray-800 mb-2">Response:</h2>
            <p className="text-gray-700">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryPage;

