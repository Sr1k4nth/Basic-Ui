import React, { useState } from "react";
import { FaBars, FaSearch, FaRegFolderOpen } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { Button, Navbar, Nav, NavItem, NavLink, Card } from "reactstrap";
import User from "../Images/man_4140048.png";
import Notification from "../Images/notification_1182718.png";

function Header(props) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <Navbar color="dark" light className="p-2 headerStyle" expand="md">
        <div className="d-flex">
          <div>
            <Button
              onClick={props.toggleNavbar}
              className="bg-transparent border-0 "
            >
              <FaBars className="text-light" size={28} />
            </Button>
          </div>
          <div className="header-hidden d-flex">
            <NavLink href="#" className="text-light mt-2 mx-4">
              <BiSolidDashboard className="text-light" size={25} />
              &nbsp;&nbsp; Dashboard
            </NavLink>
            <div className="active-header">
              <NavLink href="#" className="text-light">
                <FaRegFolderOpen className="text-light" size={25} />
                &nbsp;&nbsp; Collections
              </NavLink>
            </div>
          </div>
        </div>
        <Nav navbar>
          <div className="d-flex">
            <div className="d-flex header-hidden">
              <NavItem>
                <NavLink href="#" className="text-light mt-1">
                  <FaSearch className="text-light" size={20} />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" className="text-light mt-1">
                  <img
                    src={Notification}
                    alt="User"
                    width="25px"
                    height="25px"
                  />
                </NavLink>
              </NavItem>
            </div>
            <div>
              <Button
                className="bg-transparent border-0 "
                onClick={() => setIsShown(!isShown)}
              >
                <img src={User} alt="User" width="40px" height="40px" />
              </Button>
            </div>
          </div>
        </Nav>
      </Navbar>
      {isShown && (
        <div className="d-flex justify-content-end">
          <Card className="log-out-card">
            <div className="text-center">
              <img src={User} alt="User" width="100px" height="100px" />
              <div className="mt-2">
                <h6>Srikanth</h6>
                <h6 className="mt-2" style={{ fontSize: "13px" }}>
                  Fron End Developer
                </h6>
              </div>
            </div>
            <Button size="sm" block className="mt-3">
              Log Out
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Header;
