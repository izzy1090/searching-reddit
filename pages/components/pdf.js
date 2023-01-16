import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useEffect } from "react";


Font.register( {family: "Inter", src: "/assets/font.otf"})

const styles = StyleSheet.create({
    body: {
        paddingTop: 20
    }
})

const PDF = ({})=>{
    return (
        <Document>
            <Page style={styles.body}>
                <View style={{display: 'flex', justifyContent: "center"}}>
                    <Text wrap={false}>{}</Text>
                </View>
            </Page>
        </Document>
    )
}

const PDFView = () =>{
    const [client, setClient] = useState(false)

    useEffect(()=>{
        setClient(true)
    }, [])
    return (
        <PDFViewer>
            <PDF/>
        </PDFViewer>
    )
}

export default PDFView