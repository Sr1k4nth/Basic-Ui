import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import { Nav, NavItem } from "reactstrap";
import { BiSolidSchool, BiSolidUserCircle } from "react-icons/bi";
import { SiCodesignal } from "react-icons/si";
import { useEffect, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";

const testMenuItems = [
  {
    id: "1",
    href: "/",
    title: "School",
    icon: <BiSolidSchool />,
    background: "linear-gradient(to right, #f4c4f3, #fc67fa)",
  },
  {
    id: "2",
    href: "Pages/Personal",
    title: "Personal",
    icon: <BiSolidUserCircle />,
    background: "linear-gradient(to right, #11998e, #38ef7d)",
  },
  {
    id: "3",
    href: "Pages/Design",
    title: "Design",
    icon: <SiCodesignal />,
    background: "linear-gradient(to right, #da22ff, #9733ee)",
  },
];

export default function Layout() {
  const [menuItem] = useState(testMenuItems);
  const [activeId, setActiveId] = useState(() => {
    const activeIdTab = reactLocalStorage.getObject("activeId");
    return activeIdTab || "1";
  });
  const [collapsed, setCollapsed] = useState(() => {
    const collapsedTab = reactLocalStorage.getObject("collapsed");
    return collapsedTab === true;
  });

  useEffect(() => {
    reactLocalStorage.setObject("activeId", activeId);
    // eslint-disable-next-line
  }, [activeId]);

  useEffect(() => {
    reactLocalStorage.setObject("collapsed", collapsed);
    // eslint-disable-next-line
  }, [collapsed]);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Header toggleNavbar={toggleNavbar} />
      <div className="d-flex">
        <div className="sidebar-container">
          <div
            className={
              collapsed ? "sidebarmenu bg-dark" : "sidebarmenu1 bg-dark"
            }
          >
            <Nav vertical className="mt-5 w-100">
              <h4
                className={
                  !collapsed ? "d-none" : "text-light mb-4 mx-3 fontsize-18"
                }
              >
                {" "}
                Collections
              </h4>
              {menuItem.map((item, idx) => (
                <NavItem
                  className={
                    !collapsed
                      ? activeId === item.id
                        ? "side-nav-active1 side-nav-item1"
                        : "inactive side-nav-item1"
                      : activeId === item.id
                      ? "side-nav-active side-nav-item"
                      : "inactive side-nav-item"
                  }
                  key={item.title}
                >
                  <NavLink
                    onClick={() => setActiveId(item.id)}
                    to={item.href}
                    className="text-decoration-none mt-3"
                  >
                    <h5>
                      <span
                        style={{
                          fontSize: "25px",
                          borderRadius: "10px",
                          background: item.background,
                        }}
                        className="text-light p-2 opened"
                        title={collapsed ? "" : item.title}
                      >
                        {item.icon}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <span
                        className={
                          !collapsed ? "d-none" : "text-light fontsize-15"
                        }
                      >
                        {item.title}
                      </span>
                    </h5>
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>
        </div>
        <div className="outlet-style">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
