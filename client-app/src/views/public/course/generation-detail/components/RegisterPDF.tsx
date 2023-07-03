import {
  Page,
  Text,
  View,
  Document,
  StyleSheet, 
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { th } from "date-fns/locale";

import { GenerationDetailDTO } from "../../../../../models/Course"; 

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: "column",
    backgroundColor: "#FFF",
  },
  section: {
    padding: 6,
    fontSize: 24,
    fontFamily: "Kanit",
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    fontFamily: "Kanit",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    fontFamily: "Kanit",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "Kanit",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  text: {
    fontSize: 10,
  },
  box: {
    height: 10,
  },
});

interface Props {
  generation: GenerationDetailDTO;
}

const RegisterPDF = ({ generation }: Props) => {
  const DateFormat = (date: Date) => {
    const dateFormat = new Date(date);
    return format(dateFormat, `d MMMM ${dateFormat.getFullYear() + 543}`, {
      locale: th,
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{generation.title}</Text>
        </View>
        <View style={styles.section}>
          <Text
            style={styles.text}
          >{`รอบ: ${generation.generation.subTitle}`}</Text>

          <Text style={styles.text}>
            {`อาจารย์: ${generation.lecturer.fullName}`}
          </Text>

          <Text style={styles.text}>
            {`ระยะเวลา: ${DateFormat(
              generation.generation.startDate
            )} - ${DateFormat(generation.generation.endDate)}`}
          </Text>

          <Text
            style={styles.text}
          >{`ลงทะเบียน: ${generation.generation.attendees?.length} คน`}</Text>

          <View style={styles.box} />

          <Text>รายชื่อผู้ลงทะเบียน</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>{"ลำดับบ"}</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>{"ชื่อ"}</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>{"อีเมล"}</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>{"วันที่"}</Text>
              </View>
            </View>
            {generation.generation.attendees?.map((val, i) => (
              <View key={i} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{(i + 1)}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{val.fullName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{val.email}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {val.date && DateFormat(val.date!)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RegisterPDF;
