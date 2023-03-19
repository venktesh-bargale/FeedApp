import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Video from "react-native-video";
const { height, width } = Dimensions.get("window");

const VideoFeed = () => {
  const [Data, setData] = useState();
  const [show, setShow] = useState(false);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slideRef = useRef(null);
  const ViewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // const data = "";
  useEffect(() => {
    setTimeout(() => setShow(true), 3000);
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      `https://api.socialverseapp.com/feed?page=1`
    );
    setData(response.data);
    // console.log(Data.posts[0].video_link);
  };
  return (
    <View>
      {show ? (
        <FlatList
          data={Data.posts}
          renderItem={({ item }) => (
            <View style={{width:width,alignItems:'center'}}>
              {console.log(item)}

              <Video
                source={{ uri: item.video_link }}
                paused={true}
                style={styles.Video}
              />
            </View>
          )}
          pagngEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={ViewConfig}
          ref={slideRef}
        />
      ) : (
        <Text>Loading</Text>
      )}
      {/* {show
          ? Data.posts.map((d) => {
              console.log(d.video_link);
              return (
                <Video
                  source={{ uri: d.video_link }}
                  // paused={true}
                  // controls={true}
                  style={styles.Video}
                />
              );
            })
          : console.log("Loading")} */}
      {/* <Text>VideoFeed</Text> */}
    </View>
  );
};

export default VideoFeed;

const styles = StyleSheet.create({
  Video: {
    height:height,
    width: width,
    // flex:1
    // backgroundColor:'red'
  },
});
