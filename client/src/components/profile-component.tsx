import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Avatar, Button, Input } from '@nextui-org/react'; 
import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

interface DoctorProfileEditProps {
  email: string;
  name: string;
  degrees: string[];
  designation: string;
  specialization: string;
  phone: string[];
  bmdcNumber: string;
  digitalSignature: string;
  handleFormSubmit: (formData: any) => void;
  loading: boolean;
}

const ProfileComponent: React.FC<DoctorProfileEditProps> = ({
  email,
  name,
  degrees,
  designation,
  specialization,
  phone,
  bmdcNumber,
  digitalSignature,
  handleFormSubmit,
  loading,
}) => {
  const formik = useFormik({
    initialValues: {
      name,
      degrees,
      designation,
      specialization,
      phone: phone[0],
      bmdcNumber,
      digitalSignature,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      degrees: Yup.string().required('Degrees are required'),
      designation: Yup.string().required('Designation is required'),
      specialization: Yup.string().required('Specialization is required'),
      phone: Yup.string()
        .test('valid-phone', 'Phone number is not valid', (value) => {
          const phoneNumber = parsePhoneNumberFromString(value || '', 'US'); 
          return phoneNumber ? phoneNumber.isValid() : false;
        })
        .required('Phone number is required'),
      bmdcNumber: Yup.string().required('BMDC Number is required'),
      digitalSignature: Yup.string().required('Digital signature is required'),
    }),
    onSubmit: (values) => {
      const updatedPhoneNumbers = [values.phone, ...additionalPhones].filter(Boolean);
      handleFormSubmit({ ...values, phone: updatedPhoneNumbers });
    },
  });

  const [additionalPhones, setAdditionalPhones] = useState<string[]>(phone.slice(1));

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center pb-0 pt-6">
          <Avatar
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            alt={formik.values.name}
            className="w-32 h-32 text-large"
            fallback={formik.values.name.split(' ').map(n => n[0]).join('')}
          />
          <h2 className="text-2xl font-bold mt-4 text-slate-900">Profile</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          <form onSubmit={formik.handleSubmit}>
            {/* Name Input */}
            <Input
              label="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.name && formik.touched.name}
              errorMessage={
                formik.touched.name && formik.errors.name && (
                  <span style={{ color: 'red' }}>{formik.errors.name}</span>
                )
              }
            />

            {/* Degrees Input */}
            <Input
              label="Degrees"
              name="degrees"
              value={formik.values.degrees.join(', ')}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.degrees && formik.touched.degrees}
              errorMessage={
                formik.touched.degrees && formik.errors.degrees && (
                  <span style={{ color: 'red' }}>{formik.errors.degrees}</span>
                )
              }
            />

            {/* Designation Input */}
            <Input
              label="Designation"
              name="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.designation && formik.touched.designation}
              errorMessage={
                formik.touched.designation && formik.errors.designation && (
                  <span style={{ color: 'red' }}>{formik.errors.designation}</span>
                )
              }
            />

            {/* Specialization Input */}
            <Input
              label="Specialization"
              name="specialization"
              value={formik.values.specialization}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.specialization && formik.touched.specialization}
              errorMessage={
                formik.touched.specialization && formik.errors.specialization && (
                  <span style={{ color: 'red' }}>{formik.errors.specialization}</span>
                )
              }
            />

            {/* Primary Phone Input */}
            <Input
              label="Primary Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.phone && formik.touched.phone}
              errorMessage={
                formik.touched.phone && formik.errors.phone && (
                  <span style={{ color: 'red' }}>{formik.errors.phone}</span>
                )
              }
            />

            {/* Additional Phones */}
            {additionalPhones.map((phone, index) => (
              <div key={index} className="flex items-center mb-4">
                <Input
                  label={`Additional Phone ${index + 1}`}
                  name={`additionalPhone-${index}`}
                  value={phone}
                  onChange={(e) => handleAdditionalPhoneChange(index, e.target.value)}
                  isInvalid={!!formik.errors.phone} // Display error if any phone number is invalid
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

            {/* BMDC Number Input */}
            <Input
              label="BMDC Number"
              name="bmdcNumber"
              value={formik.values.bmdcNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.bmdcNumber && formik.touched.bmdcNumber}
              errorMessage={
                formik.touched.bmdcNumber && formik.errors.bmdcNumber && (
                  <span style={{ color: 'red' }}>{formik.errors.bmdcNumber}</span>
                )
              }
            />

            {/* Digital Signature Input */}
            <Input
              label="Digital Signature"
              name="digitalSignature"
              value={formik.values.digitalSignature}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!formik.errors.digitalSignature && formik.touched.digitalSignature}
              errorMessage={
                formik.touched.digitalSignature && formik.errors.digitalSignature && (
                  <span style={{ color: 'red' }}>{formik.errors.digitalSignature}</span>
                )
              }
            />

            <Button type="submit" isLoading={loading} className="w-full bg-primary-600 text-white">
              Save Profile
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileComponent;
