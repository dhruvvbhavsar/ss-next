//@ts-nocheck
import { getPageSession } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import data from "@/val.json";
import { Suspense } from "react";

const PaidDetails = async ({ id }: { id: string }) => {
  const details = await prisma.details.findFirst({
    where: {
      userId: id,
    },
    select: {
      astrology_details: true,
      educational_details: true,
      family_details: true,
      lifestyle_details: true,
      personal_details: true,
      professional_details: true,
      medical_details: true,
      partner_preferences: true,
      spiritual_details: true,
    },
  });

  if (!details) return;

  return (
    <Suspense fallback={<p>loading...</p>}>
      <div className="mx-auto bg-orange-200 text-blue-950 px-4">
        {Object.keys(data).map((key) => {
          return (
            <div key={key} className="py-4">
              <h2 className="text-xl font-bold mb-2 text-center">
                {key.split("_").join(" ")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.keys(details).map((keyx) => {
                  if (keyx === key) {
                    let value = details[keyx];
                    return Object.keys(value).map((keyy) => {
                      // if (value[keyy] !== undefined && value[keyy] !== "" && value[keyy] !== null) {
                      console.log(`${data[keyx][keyy]}: ${value[keyy]}`);
                      return (
                        <div key={keyy} className="flex flex-col">
                          <p className="font-semibold">{data[keyx][keyy]}:</p>
                          <p className="text-sm">
                            {Array.isArray(value[keyy]) ? (
                              <ul>
                                {value[keyy].map((item: any, index: number) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            ) : typeof value[keyy] === "boolean" ? (
                              value[keyy] ? (
                                "Yes"
                              ) : (
                                "No"
                              )
                            ) : (
                              value[keyy]
                            )}
                          </p>
                        </div>
                      );
                      // }
                      return null;
                    });
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Suspense>
  );
};

export default PaidDetails;
