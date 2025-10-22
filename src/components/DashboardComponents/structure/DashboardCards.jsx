import { Card, Row, Col } from "antd";
import { statsData } from "../../../data/homepageData";
import "../styles/dashboardCards.css"; // 👈 add this
import icon from "/assets/icons/dummy.png";
import iconWhite from "/assets/icons/whiteDummy.png";

const DashboardCards = () => {
  return (
    <Row gutter={[16]} wrap={false}>
      {" "}
      {/* wrap false = single row */}
      {statsData.map((item, index) => (
        <Col key={index} flex="1 0 0" style={{ display: "flex" }}>
          <Card className="dashboard-card card-cs">
            <div className="icon-wrapper">
              <img src={icon} alt={item.title} className="icon normal-icon" />
              <img
                src={iconWhite}
                alt={item.title}
                className="icon white-icon"
              />
            </div>
            <p className="dashboard-card-title">{item.title}</p>
            <h2 className="dashboard-card-value">{item.value}</h2>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCards;
