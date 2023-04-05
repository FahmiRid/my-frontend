import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TestingTable from "./testingTable";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./apiSlice";
import TableJson from "./TableJson";
import EditJson from "./EditJson";
const store = createStore(rootReducer);

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <TestingTable  />
      </Provider>
    </>
  );
}
