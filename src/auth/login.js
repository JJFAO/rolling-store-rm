import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
import { firebaseApp } from "../firebase";
import { Layout, Button, Form, Input } from "antd";
import { Redirect } from "react-router-dom";
import logo from "../logo.png";

const { Content } = Layout;

class Login extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    console.log(this.props);
    
    return (
      <Layout>
        <Content className="login">
          <div className="login-header">
            <h3 style={{ color: "var(--title)" }}>
              Bienvenido a Rolling Store
            </h3>
            <img src={logo} className="header-logo" alt="logo" />
          </div>

          {user ? (
            <div>
              <p>Hello, {user.displayName}</p>
              <button onClick={signOut}>log out</button>
            </div>
          ) : (
            <div className="login-content">
              <Form name="basic" initialValues={{ remember: true }}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                
                  <Button type="primary" htmlType="submit">
                    Log In
                  </Button>
                </Form.Item>
              </Form>
              <h6>or</h6>
              <Button
                block
                onClick={signInWithGoogle}
                style={{
                  backgroundColor: "var(--details)",
                  height: "3rem",
                  color: "white",
                }}
              >
                Sing in with Google
              </Button>
            </div>
          )}
          {user ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : null}
        </Content>
      </Layout>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

let providers = {
  googleProvider: new firebaseApp.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);
