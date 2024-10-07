'use client'

import { Card, CardBody, CardHeader, Avatar, Chip } from "@nextui-org/react"
import { FaPhone, FaEnvelope, FaClock, FaSignature, FaStethoscope } from 'react-icons/fa'

interface DoctorProfileProps {
  name: string
  degrees: string[]
  designation: string
  specialization: string
  consultingHours: string
  contact: {
    phone: string[]
    email: string
  }
  bmdcNumber: string
  digitalSignature: string
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  name = "Dr. Jane Smith",
  degrees = ["MBBS", "MD"],
  designation = "Senior Cardiologist",
  specialization = "Cardiology",
  consultingHours = "Mon-Fri: 9AM - 5PM",
  contact = {
    phone: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    email: "jane.smith@example.com"
  },
  bmdcNumber = "BMDC123456",
  digitalSignature = "J. Smith, MD"
}) => {
  const avatarFallback = name ? name.split(' ').map(n => n[0]).join('') : 'Dr'

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-col items-center pb-0 pt-6">
          <Avatar
            src="/placeholder.svg?height=128&width=128"
            alt={name}
            className="w-32 h-32 text-large"
            fallback={avatarFallback} 
          />
          <h2 className="text-2xl font-bold mt-4 text-slate-900">{name}</h2>
          <Chip color="primary" variant="flat" className="mt-2 text-slate-900">
            {designation}
          </Chip>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 justify-center text-slate-900">
            {degrees.map((degree, idx) => (
              <Chip key={idx} variant="flat" className="text-slate-900">
                {degree}
              </Chip>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-900">
            <div className="flex items-center gap-2">
              <FaStethoscope className="text-primary text-xl" />
              <span>{specialization}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-primary text-xl" />
              <span>{contact.email}</span>
            </div>
          </div>
          <div className="text-slate-900">
            {contact.phone.map((phone, index) => (
              <div key={index} className="flex items-center gap-2">
                <FaPhone className="text-primary text-xl" />
                <span>{phone}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-slate-900">
            <FaClock className="text-primary text-xl" />
            <span>{consultingHours}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-900">
            <FaSignature className="text-primary text-xl" />
            <span className="font-semibold">Digital Signature</span>
            <span className="font-serif italic">{digitalSignature}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-900">
            <span className="font-semibold">BMDC Number: {bmdcNumber}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default DoctorProfile
