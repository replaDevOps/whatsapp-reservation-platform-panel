import { Flex } from "antd";
import BookingManagement from "../../components/Vacation/Structure/BookingMangement";
import { VacationTable } from "../../components/Vacation";

function Vacations() {
  return (
    <div>
      <Flex vertical gap={24}>
        <BookingManagement />
        <VacationTable />
      </Flex>
    </div>
  );
}

export default Vacations;
