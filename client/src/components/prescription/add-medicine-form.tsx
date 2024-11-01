import React from "react";
import { Instructions } from "@/types/prescription";
import { useFormik } from "formik";
import { Input } from "@nextui-org/react";

const AddMedicineForm = ({ onClose }: { onClose: () => void }) => {
    const formik = useFormik<Instructions>({
        initialValues: {
            id: 0,
            instruction: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <form className="space-y-4">
            <Input
                label="Medicine Type"
                {...formik.getFieldProps("instruction")}
            />
            <Input label="Brand" {...formik.getFieldProps("instruction")} />
            <Input label="Strength" {...formik.getFieldProps("instruction")} />
            <Input label="Generic" {...formik.getFieldProps("instruction")} />
            {/*<FormButton onClose={onClose} handleSubmit={handleSubmit} />*/}
        </form>
    );
};

export default AddMedicineForm;
