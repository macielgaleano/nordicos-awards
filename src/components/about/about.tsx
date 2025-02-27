import { useEffect, useState } from "react";
import { supabase } from "../../network/users";
import "./index.css";
import { Avatar, List } from "antd";

export default function About() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const usersData: any = await supabase.from("users").select("*");
      setUsers(usersData.data.sort(() => Math.random() - 0.5));
    };
    getUsers();
  }, []);

  console.log(users);

  return (
    <div className="about__container">
      <div className="about" id="about">
        <h1>
          Nosotros, los <span>participantes</span>
        </h1>
        <div className="about__content">
          <List
            split
            dataSource={users || []}
            size="large"
            pagination={{
              pageSize: 3,
            }}
            renderItem={(user: any, index) => (
              <List.Item>
                <List.Item.Meta
                  style={{ display: "flex", alignItems: "center", color: "white" }}
                  avatar={
                    <Avatar
                      src={user.image_url}
                      style={{ width: "100px", height: "100px" }}
                    />
                  }
                  title={
                    <a style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
                      {user.name} {user.lastname}
                    </a>
                  }
                  description={
                    <a
                      style={{
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "regular",
                      }}
                    >
                      "{user.caption}"
                    </a>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}
