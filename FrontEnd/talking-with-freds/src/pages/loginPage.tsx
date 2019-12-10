import React from "react";
import { Container, Form, Button } from "semantic-ui-react";

interface IProps {}

interface IState {}

export default class LogInPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Container>
        <Form>
          <Form.Field>
            <Form.Input placeholder="Username" type="text" />
          </Form.Field>
          <Form.Field>
            <Form.Input placeholder="Password" type="password" />
          </Form.Field>
          <Button type='submit'>Sign In</Button>
        </Form>
      </Container>
    );
  }
}
