import React from "react";
import Image from "next/image";

function PrescriptionHeader() {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-green-600">Dr Rashid Khan</h1>
          <p className="text-sm text-gray-600">MBBS, FCPS, PGT (Diploma)</p>
          <p className="text-sm font-semibold text-green-600">
            Assistant professor, Medicine
          </p>
          <p className="text-sm text-gray-600">
            Popular diagnostic center and hospital, Mirpur 10
          </p>
          <p className="text-sm text-gray-600">Email: doctor@example.com</p>
          <p className="text-sm text-gray-600">
            Cell: +01293347324, +01293347324,
          </p>
          <p className="text-sm text-gray-600">BMDC: D-4874</p>
        </div>
        <Image
          src="/placeholder.svg"
          alt="Hospital Logo"
          width={80}
          height={80}
          className="bg-green-600"
        />
      </div>
      <div className="border-t border-b border-gray-300 py-2 mb-4 flex flex-wrap justify-between text-sm">
        <div>
          <span className="font-semibold">Patient:</span> Abdus Sattar Rahim
          <span className="ml-4 font-semibold">Age:</span> 28 years
          <span className="ml-4 font-semibold">Weight:</span> 53kg
        </div>
        <div>
          <span className="ml-4 font-semibold">Date:</span> 13 September, 2022
          <span className="ml-4 font-semibold">Time:</span> 10:20 am
        </div>
      </div>
    </>
  );
}

export default PrescriptionHeader;
