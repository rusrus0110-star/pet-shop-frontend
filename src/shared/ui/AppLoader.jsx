import { Flex, Spin } from "antd";

function AppLoader({ size = "large" }) {
  return (
    <Flex justify="center" align="center" style={{ minHeight: "200px" }}>
      <Spin size={size} />
    </Flex>
  );
}

export default AppLoader;
