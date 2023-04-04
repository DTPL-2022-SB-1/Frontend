import Breadcrumb from "@/components/Common/Breadcrumb";
import Appointment from "@/components/Appointment";

const AppointmentPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Appointment Page"
        description="Disini dimana kita dapat menentukan janji"
      />

      <Appointment />
    </>
  );
};

export default AppointmentPage;
