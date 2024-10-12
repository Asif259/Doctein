import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Divider,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { Section } from "@/components/prescription/prescription-template";

export default function PrescriptionTabs() {
  const [selected, setSelected] = React.useState<string | number>("patient");

  return (
    <div className="flex w-full flex-col">
      <Tabs
        classNames={{
          tabList: "w-full py-2",
        }}
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={(key) => {
          setSelected(key);
        }}
      >
        <Tab key="patient" title="Patient">
          <Card>
            <CardHeader>
              <p>Patient Information</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <form className="space-y-4">
                <Input label="Name" />
                <div className="flex flex-row gap-5">
                  <Input label="Age" />
                  <Input label="Weight" />
                </div>
                <div className="flex flex-row gap-5">
                  <Input label="Date" />
                  <Input label="Time" />
                </div>
              </form>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex justify-end space-x-4">
                <Button className="btn btn-primary">Save</Button>
                <Button className="btn btn-secondary">Cancel</Button>
              </div>
            </CardFooter>
          </Card>
        </Tab>
        <Tab key="medicine" title="Medicine">
          <Card>
            <CardHeader>
              <p>Medication</p>
            </CardHeader>
            <Divider />
            <CardBody>
              {/*
              type,
              name,
              dosage,
              duration,
              quantity,
              */}
              <form className="space-y-4">
                <div className="flex flex-row gap-5">
                  <Input className="w-1/5" label="Type" />
                  <Input className="w-4/5" label="Name" />
                </div>
                <div className="flex flex-row gap-5">
                  <Input label="Dosage" />
                  <Input label="Duration" />
                </div>
              </form>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex justify-end space-x-4">
                <Button className="btn btn-primary">Save</Button>
                <Button className="btn btn-secondary">Cancel</Button>
              </div>
            </CardFooter>
          </Card>
        </Tab>
        <Tab key="complaints" title="Complaints">
          <Card>
            <CardBody>
              <Section title="Chief Complaints">
                <form className="space-y-4">
                  <div className="flex flex-row gap-5">
                    <Input className="w-4/5" label="Name" />
                    <Input className="w-1/5" label="Duration" />
                  </div>
                  <div className="flex flex-row gap-5">
                    <Input label="Description" />
                  </div>
                </form>
              </Section>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="history" title="History">
          <Card>
            <CardBody>
              <Section title="History">
                <form className="space-y-4">
                  <div className="flex flex-row gap-5">
                    <Input className="w-4/5" label="Name" />
                    <Input className="w-1/5" label="Duration" />
                  </div>
                  <div className="flex flex-row gap-5">
                    <Input label="Description" />
                  </div>
                </form>
              </Section>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="investigation" title="Investigation">
          <Card>
            <CardBody>
              <Section title="Investigation">
                <form className="space-y-4">
                  <div className="flex flex-row gap-5">
                    <Input className="w-4/5" label="Name" />
                    <Input className="w-1/5" label="Duration" />
                  </div>
                  <div className="flex flex-row gap-5">
                    <Input label="Description" />
                  </div>
                </form>
              </Section>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="diagnosis" title="Diagnosis">
          <Card>
            <CardBody>
              <Section title="Diagnosis">
                <form className="space-y-4">
                  <div className="flex flex-row gap-5">
                    <Input className="w-4/5" label="Name" />
                    <Input className="w-1/5" label="Duration" />
                  </div>
                  <div className="flex flex-row gap-5">
                    <Input label="Description" />
                  </div>
                </form>
              </Section>
            </CardBody>
            <CardFooter>
              <div className="flex justify-end space-x-4">
                <Button className="btn btn-primary">Save</Button>
                <Button className="btn btn-secondary">Cancel</Button>
              </div>
            </CardFooter>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
