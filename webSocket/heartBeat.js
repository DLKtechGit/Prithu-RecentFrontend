import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

let heartbeatInterval = null;

export const startHeartbeat = () => {
  console.log("heart Beating");
  if (heartbeatInterval) clearInterval(heartbeatInterval);

  heartbeatInterval = setInterval(async () => {
    const sessionId = await AsyncStorage.getItem("sessionId");
    const token = await AsyncStorage.getItem("userToken"); // get auth token too
  console.log(token)
    if (!sessionId || !token) return;
    console.log("sessionId:", sessionId);

    try {
      await axios.post(
        "http://192.168.1.10:5000/api/heartbeat",
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔑 required by your auth middleware
          },
        }
      );
      console.log("Heartbeat sent");
    } catch (err) {
      console.error("Heartbeat error:", err.response?.data || err.message);
    }
  }, 30000);
};

export const stopHeartbeat = () => {
  if (heartbeatInterval) clearInterval(heartbeatInterval);
};
