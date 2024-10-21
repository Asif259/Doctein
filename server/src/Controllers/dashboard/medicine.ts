import { Request, Response } from "express";
import { IMedication } from "../../Models/dashboard/medicine";
import Medication from "../../Models/dashboard/medicine";

export const addMedication = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { dosage_type, brand, generic, strength, manufacturer, retail_price } =
    req.body as IMedication;
  try {
    const medication = new Medication({
      dosage_type,
      brand,
      generic,
      strength,
      manufacturer,
      retail_price,
    });
    const savedMedication = await medication.save();
    return res.status(201).json({ success: true, data: savedMedication });
  } catch (error: any) {
    console.log(error);
  }
};

export const searchMedication = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { search } = req.query;
  console.log(req.query);
  try {
    const medications = await Medication.find({
      $or: [
        { brand: { $regex: `^${search}`, $options: "i" } },
        { generic: { $regex: `^${search}`, $options: "i" } },
      ],
    })
      .limit(10)
      .select("brand generic strength dosage_type");

    console.log(medications);
    return res.status(200).json({ success: true, data: medications });
  } catch (error: any) {
    console.log(error);
  }
};
