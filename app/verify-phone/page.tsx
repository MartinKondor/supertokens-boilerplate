"use client";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import Header from "@/app/components/Header";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 1.2em;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default function VerifyPhone() {
    return (
        <Container>
            <Header title="Verify Phone" />
            <Form action="/api/auth/verify-phone" method="POST">
                <Label>
                    Phone Number:
                    <input type="phone" name="phone" />
                </Label>
                <Button type="submit">Send SMS</Button>
            </Form>
        </Container>
    );
}