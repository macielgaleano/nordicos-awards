import { LogIn, LogOut } from "lucide-react";
import "./index.css";
import { supabase } from "../../../network/users";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { verifyPassword } from "../../../utils/passwords";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSession from "../../../hooks/useSession";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const UserTag = () => {
  const { dataUser, clearSession, setUser } = useSession();
  const isLogged = Boolean(dataUser?.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const keySession = "session";

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    toast("Iniciando sesión...");
    let { data: users, error } = await supabase
      .from("users")
      .select()
      .eq("username", values.username);
    const user = users?.[0];
    if (error) return console.error("Error fetching user", error);
    if (!user) return toast.error("Usuario no encontrado");
    const verify =
      values.password && (await verifyPassword(values.password, user.password));
    if (!verify) return toast.error("Contraseña incorrecta");
    localStorage.setItem(keySession, JSON.stringify(user));
    setUser(user);
    setIsModalOpen(false);
    toast.success("Sesión iniciada correctamente");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const clearSessionFnc = () => {
    clearSession();
    localStorage.removeItem(keySession);
    toast.success("Sesión cerrada correctamente");
  };

  const showModal = () => {
    if (dataUser?.name) return clearSessionFnc();
    return setIsModalOpen(true);
  };
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <ToastContainer style={{ zIndex: 9999 }} />
      <div className="tag" onClick={showModal}>
        <div className="tag-image">
          <span>
            {isLogged ? `${dataUser.name} ${dataUser.lastname}` : "Iniciar sesion"}
          </span>
          {isLogged && (
            <img
              src={
                dataUser.image_url ?? "https://fakeimg.pl/600x400/ffffff/fff?text=Login"
              }
              alt=""
            />
          )}
        </div>
        {isLogged ? <LogOut /> : <LogIn />}
      </div>
      <Modal
        title="Inicia sesión"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        centered
        style={{
          zIndex: 10,
        }}
      >
        <div className="login">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Nombre de usuario"
              name="username"
              rules={[
                { required: true, message: "Por favor ingrese su nombre de usuario!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Por favor ingrese su contraseña!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>Recuerdame</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Iniciar sesion
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UserTag;
