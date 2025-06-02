import React from "react";

const ResumeSection = ({ user }) => {
  if (!user?.profile?.resume || !user?.profile?.resumeOriginalName) {
    return <p>No resume uploaded.</p>;
  }

  const encodedName = encodeURIComponent(user.profile.resumeOriginalName);

  const downloadUrl = user.profile.resume.replace(
    "/upload/",
    `/upload/fl_attachment:${encodedName}/`
  );

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Resume</h2>

      {/* Preview Resume (Optional) */}
      <iframe
        src={user.profile.resume}
        title="Resume Preview"
        className="w-full h-[500px] border mb-4"
      ></iframe>

      {/* Download Button */}
      <a
        href={downloadUrl}
        download
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Downl
      </a>
    </div>
  );
};

export default ResumeSection;
