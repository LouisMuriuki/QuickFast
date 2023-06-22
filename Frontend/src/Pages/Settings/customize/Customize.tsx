import React from "react";
import { Form, Input, Select, Space } from "antd";
import clm from "country-locale-map";
import { useContext } from "react";
import TextArea from "antd/es/input/TextArea";
import { SettingsContext } from "../../../Context/SettingsContext";
import {
  customizeTextArea,
  customizelabels,
} from "../../../constants/Constants";
const { Option } = Select;
const countries = clm.getAllCountries();
const Customize = () => {
  const { customizeinfo, setCustomizeInfo } = useContext(SettingsContext);
  const locale = clm.getLocaleByName("Kenya");
  console.log(locale);
  const handleChange = (value: string) => {
    const currency = clm.getCurrencyByName(value);
    const locale = clm.getLocaleByName(value);
    setCustomizeInfo((prev: any) => ({ ...prev, currency, locale }));
  };
  const FromChange = (name: any, value: any) => {
    setCustomizeInfo((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col w-full">
        <h1 className="flex items-center justify-center mb-10">CUSTOMIZE</h1>
      <Form
        name={"Customize"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {customizelabels &&
          customizelabels.map((labels, i) => {
            return (
              <div key={i}>
                <Form.Item
                  label={labels.label}
                  name={labels.name}
                  rules={[
                    { required: labels.required, message: labels.message },
                  ]}
                >
                  <Input
                    placeholder={labels.placeholder}
                    className="flex w-full"
                    defaultValue={customizeinfo && customizeinfo?.labels?.name}
                    onChange={(e) => {
                      FromChange(labels.name, e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
            );
          })}
      </Form>
      <div className="flex flex-col md:grid md:grid-cols-12 mb-6">
        <p className="col-span-4 md:ml-[128px]"> Currency:</p>
        <Select
          className="col-span-8"
          style={{ width: "100%" }}
          placeholder="select one country"
          defaultValue={"Kenya"}
          onChange={handleChange}
          optionLabelProp="label"
        >
          {countries.map((country) => {
            return (
              <Option
                value={country.name}
                key={country.name}
                label={country.name}
              >
                <Space>{country.name + " - " + country.currency}</Space>
              </Option>
            );
          })}
        </Select>
      </div>

      {customizeTextArea.map((textarea, i) => {
        return (
          <div key={i} className="flex flex-col md:grid md:grid-cols-12 mb-6">
            <h2 className="md:col-span-4 text-sm pb-3 md:ml-[105px] ">{`${textarea.label}:`}</h2>
            <TextArea
            className="col-span-8"
              showCount
              value={customizeinfo[textarea.name]}
              name={textarea.name}
              style={{ height: 150, resize: "none" }}
              onChange={(e) => {
                FromChange(textarea.name, e.target.value);
              }}
              placeholder="Notes- any relevant information not covered, addititonal terms and conditions"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Customize;
