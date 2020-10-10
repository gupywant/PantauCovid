import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View, Text, Dimensions, Image,ScrollView } from 'react-native';
import {Card, CardItem, Body, Thumbnail, Button, Icon, Left, Right} from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import moment from 'moment';
import WavyHeader from './components/WavyHeader';
//import Api from './components/Api';

const { width, height } = Dimensions.get("screen");
const total = "#f46f00"
const active = "#f09020";
const recover = "#009494";
const dead = "#ff004d";

  

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [stats, setStats] = useState({});
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch('https://data.covid19.go.id/public/api/update.json')
      .then((response) => response.json())
      .then((json) =>  {
        setData(json)
        let count = json.update.harian.length;
        let temp = [[],[]];
        for(let i = 1; i<=7; i++ ){
          temp[0].push(json.update.harian[count-i].jumlah_positif.value);
          temp[1].push(moment(json.update.harian[count-i].key_as_string).format('DD MMM'));
          //stats.push();
        }
        setStats(temp[0]);
        setLabels(temp[1]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      { isLoading ? <SplashUI/> : (
      <ScrollView contentContainerStyle={styles.headerContainer}>
        <WavyHeader customStyles={styles.svgCurve} />
        <Card style={styles.cardTopLeft}>
          <CardItem header style={styles.cardHeaderTopLeft}>                        
            <Text style={{color:"#e5b61d"}}>{'\u2B24'} </Text><Text style={styles.textHeader}>Konfirmasi</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: recover, fontSize: 35}}>
                  {data.update.total.jumlah_positif.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
              <Text style={{color: "#9c7700", fontSize: 18, textAlign: "left"}}>
                  +{data.update.penambahan.jumlah_positif.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({(100*(data.update.penambahan.jumlah_positif/data.update.total.jumlah_positif)).toFixed(2)}%)
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.cardTopRight}>
          <CardItem header style={styles.cardHeaderTopRight}>                        
            <Text style={{color:"#25d283"}}>{'\u2B24'} </Text><Text style={styles.textHeader}>Sembuh</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: recover, fontSize: 35}}>
                  {data.update.total.jumlah_sembuh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
              <Text style={{color: "#009f8b", fontSize: 18, textAlign: "left"}}>
                  +{data.update.penambahan.jumlah_sembuh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({(100*(data.update.penambahan.jumlah_sembuh/data.update.total.jumlah_sembuh)).toFixed(2)}%)
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.cardBottomLeft}>
          <CardItem header style={styles.cardHeaderBottomLeft}>                        
            <Text style={{color:active}}>{'\u2B24'} </Text><Text style={styles.textHeader}>Dirawat</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: recover, fontSize: 35, textAlign: "center"}}>
                  {data.update.total.jumlah_dirawat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
              <Text style={{color: "#e36004", fontSize: 18, textAlign: "left"}}>
                  +{data.update.penambahan.jumlah_dirawat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({(100*(data.update.penambahan.jumlah_dirawat/data.update.total.jumlah_dirawat)).toFixed(2)}%)
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.cardBottomRight}>
          <CardItem header style={styles.cardHeaderBottomRight}>                        
            <Text style={{color:dead}}>{'\u2B24'} </Text><Text style={styles.textHeader}>Meninggal</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body style={{justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: recover, fontSize: 35}}>
                  {data.update.total.jumlah_meninggal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
              <Text style={{color: "#e30000", fontSize: 18, textAlign: "left"}}>
                  +{data.update.penambahan.jumlah_meninggal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({(100*(data.update.penambahan.jumlah_meninggal/data.update.total.jumlah_meninggal)).toFixed(2)}%)
              </Text>
            </Body>
          </CardItem>
        </Card>
        <LineChart
          data={{
            labels: labels.reverse(),
            datasets: [
              {
                data: stats.reverse()
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: recover,
            backgroundGradientFrom: recover,
            backgroundGradientTo: "#b2d8d8",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            margin: 15,
            width: width*0.8,
            borderRadius: 16,
            marginTop: 30
          }}
        />
        <Card style={styles.cardBottomA}>
          <CardItem header style={styles.cardHeaderBottomRight}>                        
            <Text style={[styles.textHeader,{textDecorationLine: "underline"}]}>ODP-PDP</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body style={{justifyContent: "center"}}>
              <Text style={{color: recover, fontSize:12}}>ODP</Text>
              <Text style={{color: recover, fontSize:25}}>{data.data.jumlah_odp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              <Text style={{color: recover, fontSize:12}}>PDP</Text>
              <Text style={{color: recover, fontSize:25}}>{data.data.jumlah_pdp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.cardBottomA}>
          <CardItem header style={styles.cardHeaderBottomRight}>                        
            <Text style={[styles.textHeader,{textDecorationLine: "underline"}]}>Spesimen</Text>
          </CardItem>
          <CardItem style={styles.cardBody}>
            <Body style={{justifyContent: "center"}}>
              <Text style={{color: recover, fontSize:12}}>Total</Text>
              <Text style={{color: recover, fontSize:25}}>{data.data.total_spesimen.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              <Text style={{color: recover, fontSize:12}}>Negatif</Text>
              <Text style={{color: recover, fontSize:25}}>{data.data.total_spesimen_negatif.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
      )}
    </View>
  );
}

const SplashUI = () => (
  <View style={styles.containers}>
    <StatusBar backgroundColor="white" />
    <Image
      source={require('../assets/icon.png')}
    />
    <Text style={{color: "#009494"}}> Pantau Covid </Text>
    <Text style={{color: "#009494"}}> Develope with love by Gupy Wantoro </Text>
  </View>
  )
const styles = StyleSheet.create({
  containers : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor : '#fff'
  },
  logo: {
    width: 150,
    height: 150,
  },
  load:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  container: {
    height: height+(height*0.25),
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    height: height,
    flexDirection: "row",
    flexWrap:'wrap'
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 35
  },
  //warna text untuk semua header
  textHeader: {
    color: "white",
    fontSize: 13
  },
  //warna header card untuk card atas kiri
  cardHeaderTopLeft: {
    height:5,
    backgroundColor: recover,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },
  //warna header card untuk card atas kanan
  cardHeaderTopRight: {
    height:5,
    backgroundColor: recover,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },
  //warna header card untuk card kiri bawah
  cardHeaderBottomLeft: {
    height:5,
    backgroundColor: recover,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },
  //warna header card untuk card kanan bawah
  cardHeaderBottomRight: {
    backgroundColor: recover,
    height:5,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },
  //warna header card untuk card bawah
  cardHeaderBottomWidth: {
    backgroundColor: recover,
    height:5,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },
  //card untuk body
  cardBody : {
    backgroundColor: "#b2d8d8",
    borderRadius: 15,
    height: 120
  },
  //card atas kiri
  cardTopLeft:{
    backgroundColor: recover,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 45,
    borderRadius: 15,
    height: 150,
    width: width*0.42
  },
  //card atas kanan
  cardTopRight:{
    backgroundColor: recover,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 45,
    borderRadius: 15,
    height: 150,
    width: width*0.42
  },
  //card bawah kiri
  cardBottomLeft:{
    backgroundColor: recover,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    borderRadius: 15,
    height: 150,
    width: width*0.42
  },
  //card atas kanan
  cardBottomRight:{
    backgroundColor: recover,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    borderRadius: 15,
    height: 150,
    width: width*0.42
  },
  //card bawah
  cardBottomA:{
    backgroundColor: recover,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    borderRadius: 15,
    height: 150,
    width: width*0.42
  }
});