'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function OnDemandAgentUI() {
  const [role, setRole] = useState<'EXTERNAL_CUSTOMER' | 'OPERATIONS_ADMIN'>('EXTERNAL_CUSTOMER');
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    body: { userSession: { userId: 'CUST-A', role } }
  });

  return (
    <main className="max-w-2xl mx-auto p-6 font-sans min-h-screen bg-white text-black">
      <div className="border-b border-gray-200 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">ALOHAS On-Demand Ops Agent</h1>
          <p className="text-xs text-gray-500">AI-native Production & Campaign Triage</p>
        </div>
        <div className="text-right">
          <label className="text-xs block text-gray-500 mb-1 font-medium">Simulated User Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="border border-gray-300 p-1.5 text-xs rounded bg-gray-50 font-medium"
          >
            <option value="EXTERNAL_CUSTOMER">Customer (CUST-A)</option>
            <option value="OPERATIONS_ADMIN">Ops Admin (Full Access)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 mb-24">
        {messages.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-xs text-gray-600 space-y-2">
            <p className="font-semibold text-gray-800">Try asking:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><code className="bg-gray-200 px-1 py-0.5 rounded">Check order ORD-1001</code> (Allowed for CUST-A)</li>
              <li><code className="bg-gray-200 px-1 py-0.5 rounded">Check order ORD-1002</code> (Blocked & Escalated for CUST-A)</li>
              <li><code className="bg-gray-200 px-1 py-0.5 rounded">Check campaign status for BOOT-LEATHER-38</code></li>
              <li><code className="bg-gray-200 px-1 py-0.5 rounded">Check campaign status for SNEAKER-ECO-42</code></li>
            </ul>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3.5 rounded-lg text-sm ${
              m.role === 'user'
                ? 'bg-black text-white ml-auto max-w-[80%]'
                : 'bg-gray-100 text-gray-900 mr-auto max-w-[90%]'
            }`}
          >
            <span className="font-bold text-xs block mb-1 opacity-75">
              {m.role === 'user' ? 'You' : 'OnDemandAgent'}
            </span>
            <div className="whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}
      </div>

      {error && (
        <p className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 text-sm text-red-600">
          {error.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about orders or pre-order campaign velocities..."
            className="flex-1 p-3 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
}