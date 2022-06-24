import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Form } from './Form';

export default {
  title: 'Form',
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = () => <Form />;

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  label: 'test',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'test',
};
