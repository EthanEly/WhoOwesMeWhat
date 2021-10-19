import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from "react-native";
import styles from "./styles";
//import DatePicker from "react-native-date-picker";
import { firebase } from "../../firebase/config";

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState("");
  
  //new variables
  const [debtorName, setDebtorName] = useState("");
  const onChangeDebtorName = (name) => setDebtorName(name);
  
  const [debtorAmount, setDebtorAmount] = useState(0);
  const onChangeDebtorAmount = (amount) => setDebtorAmount(amount);
  
  const [debtorDate, setDebtorDate] = useState(new Date());
  const onChangeDebtorDate = (date) => setDebtorDate(date);
  
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [formShow, setFormShow] = useState(false);
  
  const [entities, setEntities] = useState([]);
  const entityRef = firebase.firestore().collection("entities");
  const userID = props.extraData.id;

  useEffect(() => {
    entityRef
      .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  // const onAddButtonPress = () => {
  //   if (entityText && entityText.length > 0) {
  //     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //     const data = {
  //       debtorName: debtorName,
  //       debtorAmount: debtorAmount,
  //       debtorDate: debtorDate,
  //       authorID: userID,
  //       createdAt: timestamp,
  //     };
  //     entityRef
  //       .add(data)
  //       .then((_doc) => {
  //         setEntityText("");
  //         Keyboard.dismiss();
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   }
  // };

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
       <View style={styles.formContainer}>
       <Text> Add a new Debtor </Text>
        <TextInput
          style={styles.input}
          placeholder="Add new entity"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Debtor Name"
          onChangeText={onChangeDebtorName}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Debt Amount"
          onChangeText={(value) => {
            const numberValue = parseInt(value, 10);
            onChangeDebtorAmount(numberValue);
          }}
        />
        <Button title="Select Date" onPress={() => setDatePickerOpen(true)} />
        <DatePicker
          modal
          open={datePickerOpen}
          date={debtorDate}
          onConfirm={(date) => {
            setDatePickerOpen(false);
            onChangeDebtorDate(date);
          }}
          onDateChange={() => {}}
          onCancel={() => {
            setDatePickerOpen(false);
          }}
        />  */}

        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
}
