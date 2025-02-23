"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { IBM_Plex_Mono } from "next/font/google";
import PoolSingle from "./PoolSingle";
import axios from "axios";
import { API_URL } from "@/utils/config";



const IBM_Plex_Mono_Font = IBM_Plex_Mono({
  variable: "--font-IBM_Plex_Mono-sans",
  subsets: ["latin"],
  weight: "400",
});
const PoolComponent: React.FC = () => {

  const [data,setData] = useState([]);

  const getData = async () => {
    const access_token = localStorage.getItem("token")
    
    try {
      const res = await axios.get(`${API_URL}/get/pools`);

      if (res.status === 200) {        
        setData(res.data.data)
      }
  
    } catch (err) {
       
    }
  }


  useEffect(() => {
    getData();
  },[])

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%",
        overflow: "auto",
        height: "200px",
        background: "#FAF3E0",
        scrollbarWidth: "none", // For Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar in Webkit browsers (Chrome, Safari)
        },
        "& th,td": {
          fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
        },
        "& td": {
          fontSize: "12px",
        },
        "& th": {
          fontSize: "13px",
          background: "#FAF3E0", // Ensure background remains visible when sticky
          position: "sticky",
          top: 0,
          zIndex: 2,
        },
        "& button": {
          fontFamily: `${IBM_Plex_Mono_Font.style.fontFamily}`,
          color: "#fff",
          background: "#000",
          textTransform: "capitalize",
          fontSize: "13px",
          border: "1px solid #E25822",
          height: "36px",
          width: "120px",
          fontWeight: "600",
          px: "1rem",
          borderRadius: "0",
          position: "relative",
          top: "-2px",
          right: "-2px",
          transition: "0.5s all",
        },
        "& .btn_wrap": {
          background: "#E25822",
          transition: "0.5s all",
          "&:hover": {
            "& button": {
              top: "0",
              right: "0",
              background: "#000",
            },
          },
        },
      }}
    >
      <Table
        sx={{
          width: { lg: "100%", xs: "600px" },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              "& th,td": {
                fontWeight: "bold",
              },
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Created on</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <PoolSingle row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PoolComponent;
