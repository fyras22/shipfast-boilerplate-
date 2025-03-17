'use client';

import { useState } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, SendIcon, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

type TicketPriority = 'low' | 'medium' | 'high';
type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    isAgent: boolean;
    content: string;
    timestamp: string;
  }[];
}

// Mock functions to simulate API calls
const getRecentTickets = (): Ticket[] => {
  return [
    {
      id: 'ticket_1',
      subject: 'Issue with installation',
      description: 'I\'m having trouble installing the boilerplate on Windows.',
      priority: 'high',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 'msg_1',
          isAgent: false,
          content: 'I\'m having trouble installing the boilerplate on Windows. I\'m getting an error that says "Cannot find module \'next\'". I\'ve tried reinstalling but it doesn\'t work.',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg_2',
          isAgent: true,
          content: 'Hi there! I\'m sorry to hear you\'re having issues. Can you confirm that you ran `npm install` in the project directory?',
          timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg_3',
          isAgent: false,
          content: 'Yes, I did run npm install but it seems some dependencies might be missing.',
          timestamp: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg_4',
          isAgent: true,
          content: 'Let\'s try a clean install. Please run the following commands:\n\n1. `rm -rf node_modules`\n2. `rm package-lock.json`\n3. `npm install`\n\nLet me know if that resolves the issue.',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'ticket_2',
      subject: 'How to customize the theme',
      description: 'I want to modify the default color scheme',
      priority: 'medium',
      status: 'open',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 'msg_5',
          isAgent: false,
          content: 'I want to modify the default color scheme. The docs mention tailwind.config.js but I\'m not seeing how to update the theme specifically.',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'ticket_3',
      subject: 'API Authentication Question',
      description: 'Need help implementing custom auth provider',
      priority: 'low',
      status: 'resolved',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      messages: [
        {
          id: 'msg_6',
          isAgent: false,
          content: 'Need help implementing custom auth provider. I want to use my own authentication service with NextAuth.',
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg_7',
          isAgent: true,
          content: 'You can create a custom provider by following the NextAuth documentation. I\'ll help you set it up!',
          timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg_8',
          isAgent: false,
          content: 'Thanks for the help! I got it working now.',
          timestamp: new Date(Date.now() - 8.5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'msg_9',
          isAgent: true,
          content: 'Great to hear! Let us know if you need anything else.',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
  ];
};

// Utility functions for tickets
const getPriorityBadge = (priority: TicketPriority) => {
  switch (priority) {
    case 'high':
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          High
        </span>
      );
    case 'medium':
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          Medium
        </span>
      );
    case 'low':
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          Low
        </span>
      );
  }
};

const getStatusBadge = (status: TicketStatus) => {
  switch (status) {
    case 'open':
      return (
        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          <MessageSquare className="w-3 h-3 mr-1" />
          Open
        </span>
      );
    case 'in_progress':
      return (
        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </span>
      );
    case 'resolved':
      return (
        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Resolved
        </span>
      );
    case 'closed':
      return (
        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Closed
        </span>
      );
  }
};

// Format date to a readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

function TicketList() {
  const tickets = getRecentTickets();

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
      {tickets.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            You haven't submitted any tickets yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <Link href={`/dashboard/support/${ticket.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-750">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">
                          {ticket.subject}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {getPriorityBadge(ticket.priority)}
                        {getStatusBadge(ticket.status)}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <p>
                          Updated {formatDate(ticket.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function NewTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    // Validation
    if (!subject.trim()) {
      setSubmitError('Please enter a subject');
      setIsSubmitting(false);
      return;
    }

    if (!description.trim()) {
      setSubmitError('Please enter a description');
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real app, this would be an API call
      // await fetch('/api/tickets', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ subject, description, priority }),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset form
      setSubject('');
      setDescription('');
      setPriority('medium');
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Failed to create ticket. Please try again.');
      console.error('Error creating ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Submit a New Ticket</h2>
      
      {submitSuccess ? (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Ticket submitted successfully!
              </p>
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                We'll get back to you as soon as possible.
              </p>
              <button
                className="mt-2 text-sm font-medium text-green-700 dark:text-green-300 underline"
                onClick={() => setSubmitSuccess(false)}
              >
                Submit another ticket
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {submitError && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700 dark:text-red-300">{submitError}</p>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Brief description of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Please provide as much detail as possible..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Priority
            </label>
            <select
              id="priority"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TicketPriority)}
            >
              <option value="low">Low - General question or feature request</option>
              <option value="medium">Medium - Issue affecting functionality but with workaround</option>
              <option value="high">High - Critical issue blocking work</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-4 py-2 rounded-md text-white font-medium transition-colors ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 h-4 w-4" />
                  Submit Ticket
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mt-2">Support</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get help with any issues or questions you have about the ShipFast Boilerplate
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<div>Loading ticket form...</div>}>
          <NewTicketForm />
        </Suspense>
        
        <Suspense fallback={<div>Loading your tickets...</div>}>
          <TicketList />
        </Suspense>
      </div>
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Self-Help Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://github.com/fyras22/shipfast-boilerplate-/wiki" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            <h3 className="font-medium mb-1">Documentation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprehensive guides and API references
            </p>
          </a>
          <a 
            href="https://github.com/fyras22/shipfast-boilerplate-/discussions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            <h3 className="font-medium mb-1">Community</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join discussions with other developers
            </p>
          </a>
          <a 
            href="/faq" 
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            <h3 className="font-medium mb-1">FAQ</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Answers to commonly asked questions
            </p>
          </a>
          <a 
            href="https://www.youtube.com/channel/YOUR_CHANNEL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            <h3 className="font-medium mb-1">Video Tutorials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step-by-step visual instructions
            </p>
          </a>
        </div>
      </div>
    </div>
  );
} 