// emails/ResetPasswordEmail.jsx
import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Section,
  Link,
} from "@react-email/components";

export const ResetPasswordEmail = ({ resetLink }) => (
  <Html>
    <Body style={mainStyle}>
      <Container style={containerStyle}>
        <Section style={logoSection}>
          <Text style={logoText}>
            Olú{" "}
            <span style={{ fontStyle: "normal", fontWeight: "400" }}>
              The Maker
            </span>
          </Text>
        </Section>

        <Hr style={hrStyle} />
        <Heading style={h1Style}>Security Credentials.</Heading>
        <Text style={textStyle}>
          A request was made to reset your password with us.
        </Text>
        <Section style={btnSection}>
          <Link href={resetLink} style={buttonStyle}>
            Update Password
          </Link>
        </Section>
        <Text style={smallTextStyle}>
          If you did not request this, please ignore this message. The link will
          expire in 60 minutes.
        </Text>
      </Container>
    </Body>
  </Html>
);

const mainStyle = { backgroundColor: "#f9f7f2", padding: "40px 0" };
const containerStyle = {
  backgroundColor: "#ffffff",
  padding: "40px",
  border: "1px solid #1a1a1a10",
};
const h1Style = {
  fontFamily: "serif",
  fontStyle: "italic",
  fontSize: "32px",
  color: "#1a1a1a",
};
const textStyle = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#1a1a1a",
  opacity: "0.8",
};
const refStyle = {
  fontSize: "10px",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  fontWeight: "bold",
  margin: "20px 0",
};
const buttonStyle = {
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  padding: "12px 24px",
  textTransform: "uppercase",
  fontSize: "10px",
  letterSpacing: "0.2em",
  textDecoration: "none",
};
const footerStyle = {
  fontSize: "9px",
  letterSpacing: "0.4em",
  textAlign: "center",
  marginTop: "40px",
  opacity: "0.4",
};

const btnSection = {
  textAlign: "center",
  marginTop: "30px",
  marginBottom: "30px",
};
const smallTextStyle = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#1a1a1a",
  opacity: "0.5",
  fontStyle: "italic",
  marginTop: "20px",
};

const logoSection = {
  textAlign: "center",
  paddingBottom: "20px",
};

const logoText = {
  fontSize: "24px",
  fontFamily: "serif",
  fontStyle: "italic",
  fontWeight: "bold",
  letterSpacing: "-0.05em",
  textTransform: "uppercase",
  color: "#1a1a1a",
};

const hrStyle = {
  borderTop: "1px solid #1a1a1a10",
  margin: "20px 0",
};
