import { FormItemProps } from "antd";

export const ReuqireNumberRules: FormItemProps["rules"] = [
  { required: true },
  {
    message: "请输入数字",
    validator: (_, value) => {
      if (Number.isNaN(Number(value))) {
        return Promise.reject(new Error("Not a Number"));
      }
      return Promise.resolve();
    },
  },
];

export function normalizeNumber(v: string) {
  if (Number.isNaN(Number(v))) {
    return v
  }

  console.log(/^d+./.test(v),v)

  if (/^\d+\./.test(v)) {
    return v
  }

  return Number(v)
}