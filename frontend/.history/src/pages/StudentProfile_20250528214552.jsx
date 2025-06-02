import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentApplications } from '@/redux/slices/applicationSlice';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentProfile() {
  const dispatch = useDispatch();
  const { studentApplications, loading } = useSelector((state) => state.application);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStudentApplications());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{user?.fullname}'s Applications.....</h1>
      
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : studentApplications?.length > 0 ? (
        <div className="grid gap-4">
          {studentApplications.map((app) => (
            <div key={app._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  {/* <h3 className="text-xl font-semibold">{app.job?.title}</h3> */}
                  <div className="flex items-center gap-2 mt-2">
                    {app.job?.company?.logo_url && (
                      <img 
                        src={app.job.company.logo_url} 
                        alt="Company logo" 
                        className="h-8 w-8 object-contain" 
                      />
                    )}
                    <span className="text-gray-600">{app.job?.company?.name}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`capitalize ${
                    app.status === 'accepted' ? 'text-green-600' :
                    app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {app.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    Applied: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't applied to any jobs yet</p>
        </div>
      )}
    </div>
  );
}