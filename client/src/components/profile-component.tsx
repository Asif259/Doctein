'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Avatar, Input, Button } from '@nextui-org/react';

interface DoctorProfileEditProps {
  name: string;
  degrees: string[];
  designation: string;
  specialization: string;
  consultingHours: string;
  phone: string[];
  bmdcNumber: string;
  digitalSignature: string;
}

const Profile: React.FC<DoctorProfileEditProps> = ({
  name,
  degrees,
  designation,
  specialization,
  consultingHours,
  phone,
  bmdcNumber,
  digitalSignature,
}) => {
  const [formData, setFormData] = useState({
    name,
    degrees: degrees.join(', '),
    designation,
    specialization,
    consultingHours,
    phone: phone[0], // Use the first phone number for the main input
    bmdcNumber,
    digitalSignature,
  });

  const [additionalPhones, setAdditionalPhones] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdditionalPhoneChange = (index: number, value: string) => {
    const updatedPhones = [...additionalPhones];
    updatedPhones[index] = value;
    setAdditionalPhones(updatedPhones);
  };

  const handleAddPhone = () => {
    if (additionalPhones.length < 9) {
      setAdditionalPhones([...additionalPhones, '']);
    } else {
      alert('You can only add up to 9 additional phone numbers.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPhoneNumbers = [formData.phone, ...additionalPhones].filter(Boolean);
    const updatedFormData = { ...formData, phone: updatedPhoneNumbers };
    console.log('Updated profile data:', updatedFormData);
    // Logic to submit updated profile info to the backend
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center pb-0 pt-6">
          <Avatar
            src="/placeholder.svg?height=128&width=128"
            alt={formData.name}
            className="w-32 h-32 text-large"
            fallback={formData.name.split(' ').map(n => n[0]).join('')}
          />
          <h2 className="text-2xl font-bold mt-4 text-slate-900">Edit Profile</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          <form onSubmit={handleFormSubmit}>
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            <Input
              label="Degrees (comma-separated)"
              type="text"
              name="degrees"
              value={formData.degrees}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            <Input
              label="Designation"
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            <Input
              label="Specialization"
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            <Input
              label="Consultation Hours"
              type="text"
              name="consultingHours"
              value={formData.consultingHours}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            <Input
              label="Primary Phone"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            {additionalPhones.map((phone, index) => (
              <div key={index} className="flex items-center mb-4">
                <Input
                  label={`Additional Phone ${index + 1}`}
                  type="text"
                  value={phone}
                  onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                  className="text-slate-900 flex-grow"
                />
                <Button
                  type="button"
                  onClick={() => {
                    const updatedPhones = additionalPhones.filter((_, i) => i !== index);
                    setAdditionalPhones(updatedPhones);
                  }}
                  className="ml-2 text-red-500"
                >
                  X
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddPhone} className="mb-4 bg-primary-600 text-white">
              Add additional phone
            </Button>
            <Input
              label="BMDC Number"
              type="text"
              name="bmdcNumber"
              value={formData.bmdcNumber}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            <Input
              label="Digital Signature"
              type="text"
              name="digitalSignature"
              value={formData.digitalSignature}
              onChange={handleInputChange}
              required
              className="text-slate-900 mb-4"
            />
            <Button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg">
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
