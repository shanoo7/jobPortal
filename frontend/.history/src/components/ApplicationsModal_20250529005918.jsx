
import React from 'react';

const ApplicationsModal = ({ applications = [], onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className=" rounded-lg p-6 w-full bg-amber-50 max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Applicants</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {!applications?.length ? (
          <p className="text-gray-600 text-center">No applicants yet</p>
        ) : (
          <div className="space-y-4">
            {applications.map((application, index) => {
              // Null check for application and applicant
              if (!application || !application?.applicant) return null;
              
              const { applicant, status } = application;
              const hasResume = applicant?.resume?.url;

              return (
                <div 
                  key={application?._id || index} 
                  className="border p-4 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    {/* Applicant Avatar */}
                    {applicant?.avatar && (
                      <img 
                        src={applicant.avatar} 
                        alt="Applicant" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        loading="lazy"
                      />
                    )}

                    {/* Applicant Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-gray-800">
                        {applicant?.fullname || 'Anonymous Applicant'}
                      </h3>
                      
                      <p className="text-gray-600 text-sm">
                        {applicant?.email || 'No email provided'}
                      </p>

                      {/* Application Status */}
                      <div className="mt-2 flex items-center gap-3">
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          status === 'accepted' 
                            ? 'bg-green-100 text-green-800'
                            : status === 'rejected' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          Status: {status || 'pending'}
                        </span>

                        {/* Resume Link */}
                        {hasResume ? (
                          <a
                            href={applicant.resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            📄 View Resume
                          </a>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            No resume submitted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsModal;