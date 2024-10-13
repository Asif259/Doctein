import React from "react";
import { Button, Card, CardBody, CardHeader, User } from "@nextui-org/react";
import { CardFooter } from "@nextui-org/card";

const CardLeft = () => {
    return (
        <Card className="w-full max-w-sm p-1 m-16">
            <CardHeader className="flex justify-between items-center ">
                <span className="text-black ">Patients History</span>
                <Button size="sm" color="warning">
                    +15%
                </Button>
            </CardHeader>
            <CardBody
                className={
                    "card-body flex-row justify-between items-center text-center"
                }
            >
                <div className="inline-block user">
                    <User
                        className="text-black"
                        name="Sumit mia"
                        description="saibo da doctor dayo"
                        avatarProps={{
                            src: "/Sumit.png",
                        }}
                    />
                </div>
                <span className="text-sm">7d</span>
            </CardBody>
            <CardFooter className="flex items-center justify-between  ">
                <span className="flex items-center justify-between  ">
                    <div className="rounded-full w-8 h-8 border-2 border-black flex items-center justify-center m-1 border-hidden">
                        <div className="rounded-full w-5 bg-gray-500 h-5 "></div>
                    </div>
                    <div className="rounded-full w-8 h-8 border-2 border-black flex items-center justify-center m-1">
                        <div className="rounded-full w-5 bg-gray-500 h-5 "></div>
                    </div>
                    <div className="rounded-full w-8 h-8 border-2 border-black flex items-center justify-center m-1 border-hidden">
                        <div className="rounded-full w-5 bg-gray-500 h-5 "></div>
                    </div>
                </span>

                <span className="text-black text-4xl">+10.57</span>
            </CardFooter>
        </Card>
    );
};

export default CardLeft;
