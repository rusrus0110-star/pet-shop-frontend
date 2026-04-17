import { Button } from "antd";

function AppButton({
  children,
  type = "primary",
  htmlType = "button",
  ...props
}) {
  return (
    <Button type={type} htmlType={htmlType} {...props}>
      {children}
    </Button>
  );
}

export default AppButton;
