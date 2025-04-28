/* eslint-disable no-case-declarations */
import { FURNITURE_TYPE_ENUM } from "@/constants";
import { PriceCalculation } from "@/typings";
import { Form, Select, Input, Button, Radio } from "antd";
import { CircularItems, RectangleItems } from "./widgets";
import { ReuqireNumberRules, normalizeNumber } from "@/utils";
import { useState } from "react";

import BigNumber from "bignumber.js";

export default function Index() {
  const [form] = Form.useForm<PriceCalculation>();
  const [price, setPrice] = useState(0); // 标价
  const [discount, setDiscount] = useState(1);

  /** 长桌计算规则 */
  const onCompute = (data: PriceCalculation) => {
    const { type } = data;
    const price = new BigNumber(data.price);

    switch (type) {
      case FURNITURE_TYPE_ENUM.LONG: {
        const length = new BigNumber(data.length);
        const width = new BigNumber(data.width);

        // ((data.length + 0.15) * (data.width + 0.15) * price * 1.3 + 4100) * 3
        return length
          .plus(0.15)
          .times(width.plus(0.15))
          .times(price)
          .times(1.3)
          .plus(3500)
          .times(3)
          .plus(data.leg)
          .toNumber();
      }

      case FURNITURE_TYPE_ENUM.ROUND:
        const diameterLong = new BigNumber(data.diameterLong);
        const diameterSmall = new BigNumber(data.diameterSmall);

        // (((data.diameterLong + 0.15) ** 2 + (data.diameterSmall + 0.15) ** 2) * 1.3 * price + 4100) * 3;
        return diameterLong
          .plus(0.15)
          .pow(2)
          .plus(diameterSmall.pow(2))
          .times(1.3)
          .times(price)
          .plus(4100)
          .times(3)
          .plus(data.leg)
          .toNumber();

      case FURNITURE_TYPE_ENUM.GATE: {
        const width = new BigNumber(data.width);
        const length = new BigNumber(data.length);

        // (price * length * width * 1.3 + 2500) * 3
        return price
          .times(length)
          .times(width)
          .times(1.3)
          .plus(2500)
          .times(3)
          .toNumber();
      }

      case FURNITURE_TYPE_ENUM.TEA: {
        const width = new BigNumber(data.width);
        const length = new BigNumber(data.length);

        // (width * length * 1.3 * price + 1500) * 3
        return width
          .times(length)
          .times(1.3)
          .times(price)
          .plus(1500)
          .times(3)
          .toNumber();
      }

      default:
        return 0;
    }
  };

  const onFinish = async () => {
    try {
      const data = await form.validateFields();
      setPrice(() => onCompute(data));
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="w-ful h-full">
      <Form<PriceCalculation>
        form={form}
        onFinish={onFinish}
        preserve={false}
        labelCol={{ span: 2 }}
        className="w-full"
        wrapperCol={{ span: 24 }}
        onValuesChange={() => onFinish()}
      >
        <Form.Item
          label={"类型"}
          name={"type"}
          initialValue={FURNITURE_TYPE_ENUM.LONG}
        >
          <Select
            options={[
              { label: "茶几", value: FURNITURE_TYPE_ENUM.TEA },
              { label: "长桌", value: FURNITURE_TYPE_ENUM.LONG },
              { label: "玄关", value: FURNITURE_TYPE_ENUM.GATE },
              { label: "圆桌", value: FURNITURE_TYPE_ENUM.ROUND },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={"版面"}
          name={"price"}
          rules={ReuqireNumberRules}
          initialValue={0}
          normalize={normalizeNumber}
        >
          <Input className="text-center" />
        </Form.Item>

        <Form.Item dependencies={["type"]}>
          {({ getFieldValue }) => {
            const type = getFieldValue("type");

            switch (type) {
              case FURNITURE_TYPE_ENUM.LONG:
                return (
                  <>
                    <RectangleItems />

                    <Form.Item
                      name={"leg"}
                      label={"桌腿"}
                      rules={ReuqireNumberRules}
                      initialValue={0}
                      normalize={normalizeNumber}
                    >
                      <Select
                        options={[
                          {
                            label: "一级",
                            value: 0,
                          },
                          {
                            label: "二级",
                            value: 1000,
                          },
                        ]}
                      />
                    </Form.Item>
                  </>
                );

              case FURNITURE_TYPE_ENUM.GATE:
              case FURNITURE_TYPE_ENUM.TEA:
                return <RectangleItems />;

              case FURNITURE_TYPE_ENUM.ROUND:
                return (
                  <>
                    <CircularItems />

                    <Form.Item
                      name={"leg"}
                      label={"桌腿"}
                      rules={ReuqireNumberRules}
                      initialValue={0}
                      normalize={normalizeNumber}
                    >
                      <Select
                        options={[
                          {
                            label: "一级",
                            value: 0,
                          },
                          {
                            label: "二级",
                            value: 1000,
                          },
                        ]}
                      />
                    </Form.Item>
                  </>
                );

              default:
                break;
            }
          }}
        </Form.Item>

        <Button block type="primary" htmlType="submit">
          {price.toFixed(2)}
        </Button>

        <Form.Item className="mt-4" label={"折率"}>
          <Radio.Group
            onChange={({ target: { value } }) => {
              setDiscount(value);
            }}
          >
            <Radio.Button value={0.6}>6</Radio.Button>
            <Radio.Button value={0.65}>6.5</Radio.Button>
            <Radio.Button value={0.7}>7</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Button block className="mt-2">
          {(price * discount).toFixed(2)}
        </Button>
      </Form>
    </div>
  );
}
