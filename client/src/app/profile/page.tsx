import ProfileComponent from '@/components/profile-component';

const ProfilePage = () => {
  // Sample data for the profile
  const sampleDoctorData = {
    name: "Dr. Jane Smith",
    degrees: ["MBBS", "MD"],
    designation: "Senior Cardiologist",
    specialization: "Cardiology",
    consultingHours: "Mon-Fri: 9AM - 5PM",
    phone: ["+1 (555) 123-4567"],
    bmdcNumber: "BMDC123456",
    digitalSignature: "J. Smith, MD",
  };

  return (
    <div>
      <ProfileComponent {...sampleDoctorData} />
    </div>
  );
};

export default ProfilePage;
