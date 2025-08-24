"use client"
import { FC, useState } from "react"
import AppButton from "../../../components/app/AppButton";
import { useAppointmentStore } from "../../../../store/appointment";


type Props = {
  addOnServices: any[];
  toggleStep: (step: "prev" | "next") => void;
}

const AddOnStep: FC<Props> = ({ addOnServices = [], toggleStep }) => {  
  const { appendAppointData } = useAppointmentStore();

  const [selectedServices, setSelectedServices] = useState<any[]>([]);

  const handleAddOnChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    const addOnService = target.value;
    if (target.checked) {
      setSelectedServices((prev) => [...prev, addOnService]);

    } else {
      setSelectedServices(selectedServices.filter((item) => item !== addOnService));
    }
  }

  const goToNext = () => {
    appendAppointData({
      addOnServices: selectedServices
    })
    toggleStep('next');
  }



  return (
    <div className="min-h-[200px]">

      <p className="text-sm text-[#192020] font-[300] text-center mb-8">Add to appointment</p>

      <div className="my-4">
        {
          addOnServices.length ? addOnServices.map((service: any, idx: number) => (
            <div key={idx} className="flex gap-4 items-center">
              <div>
                <input
                  type="checkbox" 
                  id="addOnService"
                  className="w-4 h-4 border-[1px] border-[#BDC6C6] rounded-sm"
                  value={service.title}
                  onChange={handleAddOnChange}
                />
              </div>
              <div>{ service.title }</div>

            </div>
          )) : <p className="text-sm text-[#192020] font-[300] text-center">No add on services available Proceed to Next step</p>

        }
      </div>


      <div className="my-4 flex gap-4 items-center">
        <AppButton
          btnText={'Back'}
          fill={'outline'}
          bgColor={"black"}
          width={"max"}
          onClick={() => toggleStep('prev')}
        />
        <AppButton
          btnText={'Continue'}
          fill={'fill'}
          bgColor={'primary'}
          width={"max"}
          onClick={() => goToNext()}

        />
      </div>

    </div>
  )
}

export default AddOnStep

