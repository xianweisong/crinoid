import { Form, Input, Space, Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { ReuqireNumberRules, normalizeNumber } from "@/utils";
import { BigNumber } from "bignumber.js";

interface NumberInputProps {
  value?: number;
  action?: boolean;
  onChange?: (v: number) => void;
}

/** 数字输入框 */
export function NumberInput(props: NumberInputProps) {
  const { value, action = true } = props;

  const onChange = (value: number) => {
    props?.onChange?.(value);
  };

  const onCompute = (type: keyof BigNumber, num2: number) => {
    if (value === undefined) {
      return;
    }

    if (Number.isNaN(Number(value))) {
      return;
    }

    const num1 = new BigNumber(value);

    switch (type) {
      case "plus":
      case "minus":
        onChange?.(num1[type](num2).toNumber());
        break;
    }
  };

  return !action ? (
    <Input
      value={value}
      onChange={({ target: { value } }) => {
        onChange(value as unknown as number);
      }}
    />
  ) : (
    <Space.Compact>
      <Button
        icon={<DoubleLeftOutlined />}
        onClick={() => onCompute("minus", 0.1)}
      />
      <Button icon={<LeftOutlined />} onClick={() => onCompute("minus", 0.01)} />

      <Input
        value={value}
        onChange={({ target: { value } }) => {
          onChange(value as unknown as number);
        }}
      />

      <Button
        icon={<RightOutlined />}
        onClick={() => onCompute("plus", 0.01)}
      />
      <Button
        icon={<DoubleRightOutlined />}
        onClick={() => onCompute("plus", 0.1)}
      />
    </Space.Compact>
  );
}

export function RectangleItems() {
  return (
    <>
      <Form.Item
        name={"length"}
        label={"长度"}
        rules={ReuqireNumberRules}
        initialValue={1}
        normalize={normalizeNumber}
      >
        <NumberInput />
      </Form.Item>

      <Form.Item
        name={"width"}
        label={"宽度"}
        rules={ReuqireNumberRules}
        initialValue={1}
        normalize={normalizeNumber}
      >
        <NumberInput />
      </Form.Item>
    </>
  );
}

export function CircularItems() {
  return (
    <>
      <Form.Item
        label={"大桌直径"}
        name={"diameterLong"}
        rules={ReuqireNumberRules}
        normalize={normalizeNumber}
        initialValue={1}
      >
        <NumberInput />
      </Form.Item>

      <Form.Item
        label={"小桌直径"}
        name={"diameterSmall"}
        rules={ReuqireNumberRules}
        normalize={normalizeNumber}
        initialValue={1}
      >
        <NumberInput />
      </Form.Item>
    </>
  );
}
