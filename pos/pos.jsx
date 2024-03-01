/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Header from "./posheader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import POS from "./posleft";
import Transactions from "./transactions";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import {
  Product34,
  wallet1,
  transcation,
  trash12,
  scan,
  Edit6,
  pause1,
  debitcard,
  cash,
  Product30,
  Product31,
  Product35,
  delete2,
  ellipise1,
  scanner1
} from "../../EntryFile/imagePath";
import PosData from "../../assets/data/PosData";
import { useDispatch } from "react-redux";
import { addClient } from "../../stroe/reducers/clientReducer";
import { useSelector } from "react-redux";
import {
  removeCart,
  removeFromCart,
  updateCart
} from "../../stroe/reducers/clientCartReducer";

const Pos = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cart);
  console.log(cart);
  const options1 = [
    { id: 1, text: "المنتج", text1: "المنتج" },
    { id: 2, text: "الباركود", text2: "الباركود" }
  ];
  const clients = useSelector((state) => state.client?.clients);
  const [data, setdata] = useState([
    {
      id: 1,
      image: require("../../assets/Golds/ring1.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 2,
      image: require("../../assets/Golds/ring2.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 3,
      image: require("../../assets/Golds/ring3.webp"),
      category: 'خواتم',
      cat: 'rings',

      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 4,
      image: require("../../assets/Golds/ring4.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 5,
      image: require("../../assets/Golds/ring5.webp"),
      category: 'خواتم',
      cat: 'rings',

      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 6,
      image: require("../../assets/Golds/ring6.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 7,
      image: require("../../assets/Golds/ring7.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 8,
      image: require("../../assets/Golds/ring8.webp"),
      category: 'خواتم',
      cat: 'rings',

      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 9,
      image: require("../../assets/Golds/ring9.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 10,
      image: require("../../assets/Golds/ring10.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: 'خاتم',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 12,
      image: require("../../assets/Golds/necklace2.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 13,
      image: require("../../assets/Golds/necklace3.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 13,
      image: require("../../assets/Golds/necklace4.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 14,
      image: require("../../assets/Golds/necklace5.webp"),
      category: 'قلاده',

      cat: 'necklace',
      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 15,
      image: require("../../assets/Golds/necklace6.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 16,
      image: require("../../assets/Golds/necklace7.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 17,
      image: require("../../assets/Golds/necklace8.webp"),
      category: 'قلاده',

      cat: 'necklace',
      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 18,
      image: require("../../assets/Golds/necklace9.webp"),
      category: 'قلاده',

      cat: 'necklace',
      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 19,
      image: require("../../assets/Golds/necklace10.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: 'قلاده',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 20,
      image: require("../../assets/Golds/gaw1.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 21,
      image: require("../../assets/Golds/gaw2.webp"),
      category: 'غوايش',
      cat: 'gweisha',

      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 22,
      image: require("../../assets/Golds/gaw3.webp"),
      category: 'غوايش',
      cat: 'gweisha',

      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 22,
      image: require("../../assets/Golds/gaw4.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 23,
      image: require("../../assets/Golds/gaw5.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 24,
      image: require("../../assets/Golds/gaw6.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 25,
      image: require("../../assets/Golds/gaw7.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 26,
      image: require("../../assets/Golds/gaw8.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 27,
      image: require("../../assets/Golds/gaw9.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 28,
      image: require("../../assets/Golds/gaw10.webp"),

      category: 'غوايش',
      cat: 'gweisha',
      name: 'غويشه',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 29,
      image: require("../../assets/Golds/bracelet1.webp"),

      category: 'اساور',
      cat: 'bracelets',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 30,
      image: require("../../assets/Golds/bracelet2.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 31,
      image: require("../../assets/Golds/bracelet3.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 32,
      image: require("../../assets/Golds/bracelet4.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 34,
      image: require("../../assets/Golds/bracelet5.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 35,
      image: require("../../assets/Golds/bracelet6.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 36,
      image: require("../../assets/Golds/bracelet7.webp"),
      category: 'اساور',
      cat: 'bracelets',

      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 37,
      image: require("../../assets/Golds/bracelet8.webp"),
      category: 'اساور',
      cat: 'bracelets',

      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 38,
      image: require("../../assets/Golds/bracelet9.jpg"),
      category: 'اساور',
      cat: 'bracelets',

      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 39,
      image: require("../../assets/Golds/golpalm.webp"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: 'كف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 40,
      image: require("../../assets/Golds/golpalm2.webp"),
      category: 'كفوف ذهب',

      cat: 'palm_gold',
      name: 'كف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 41,
      image: require("../../assets/Golds/golpalm3.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: 'كف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 42,
      image: require("../../assets/Golds/golpalm4.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: 'كف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 43,
      image: require("../../assets/Golds/golpalm5.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: 'كف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 44,
      image: require("../../assets/Golds/golpalm6.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 45,
      image: require("../../assets/Golds/golpalm7.jpg"),
      category: 'كفوف ذهب',

      cat: 'palm_gold',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 46,
      image: require("../../assets/Golds/golpalm8.webp"),
      category: 'كفوف ذهب',

      cat: 'palm_gold',
      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 47,
      image: require("../../assets/Golds/golpalm9.webp"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 48,
      image: require("../../assets/Golds/golpalm10.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: 'إسوره',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 49,
      image: require("../../assets/Golds/goldchar1.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: 'حرف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 50,
      image: require("../../assets/Golds/goldchar3.jpg"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: 'حرف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 51,
      image: require("../../assets/Golds/goldchar4.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: 'حرف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 52,
      image: require("../../assets/Golds/goldchar5.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: 'حرف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 53,
      image: require("../../assets/Golds/goldchar6.jpg"),
      category: 'حروف ذهب',
      cat: 'char_gold',
      name: 'حرف ذهب',

      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 54,
      image: require("../../assets/Golds/goldchar7.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: 'حرف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 55,
      image: require("../../assets/Golds/goldchar8.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: 'حرف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 56,
      image: require("../../assets/Golds/goldchar9.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: 'حرف ذهب',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 57,
      image: require("../../assets/Golds/earring3.webp"),
      category: 'حلق',
      cat: 'earring',

      name: 'حلق',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 58,
      image: require("../../assets/Golds/earring4.webp"),
      category: 'حلق',

      cat: 'earring',
      name: 'حلق',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 59,
      image: require("../../assets/Golds/earring5.webp"),
      category: 'حلق',

      cat: 'earring',
      name: 'حلق',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 60,
      image: require("../../assets/Golds/earring6.webp"),
      category: 'حلق',
      cat: 'earring',

      name: 'حلق',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 61,
      image: require("../../assets/Golds/earring6.webp"),
      category: 'حلق',
      cat: 'earring',

      name: 'حلق',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 62,
      image: require("../../assets/Golds/anklet1.webp"),

      category: 'خلاخيل',
      cat: 'anklets',
      name: 'خلخال',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 63,
      image: require("../../assets/Golds/anklet2.webp"),
      category: 'خلاخيل',

      cat: 'anklets',
      name: 'خلخال',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 64,
      image: require("../../assets/Golds/anklet3.webp"),
      category: 'خلاخيل',

      cat: 'anklets',
      name: 'خلخال',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 65,
      image: require("../../assets/Golds/anklet4.webp"),
      category: 'خلاخيل',
      cat: 'anklets',

      name: 'خلخال',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 66,
      image: require("../../assets/Golds/anklet5.webp"),
      category: 'خلاخيل',

      cat: 'anklets',
      name: 'خلخال',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 67,
      image: require("../../assets/Golds/anklet6.webp"),
      category: 'خلاخيل',
      cat: 'anklets',

      name: 'خلخال',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 68,
      image: require("../../assets/Golds/anklet8.webp"),
      category: 'خلاخيل',

      cat: 'anklets',
      name: 'خلخال',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 69,
      image: require("../../assets/Golds/shukrarat1.webp"),
      category: 'شوكرات',
      cat: 'shukrarat',

      name: 'شوكر',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 70,
      image: require("../../assets/Golds/shukrarat2.webp"),
      category: 'شوكرات',
      cat: 'shukrarat',

      name: 'شوكر',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 71,
      image: require("../../assets/Golds/shukrarat3.webp"),
      category: 'شوكرات',
      cat: 'shukrarat',

      name: 'شوكر',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 72,
      image: require("../../assets/Golds/shukrarat4.jpg"),
      category: 'شوكرات',
      cat: 'shukrarat',

      name: 'شوكر',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 73,
      image: require("../../assets/Golds/shukrarat5.jpg"),
      category: 'شوكرات',
      cat: 'shukrarat',
      name: 'شوكر',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 74,
      image: require("../../assets/Golds/shukrarat6.jpg"),
      category: 'شوكرات',
      cat: 'shukrarat',
      name: 'شوكر',
      price: (1100 + Math.random() * 34).toFixed(3)
    }
  ]);
  const [originaldata, setoriginaldata] = useState([
    {
      id: 1,
      image: require("../../assets/Golds/ring1.webp"),
      category: 'خواتم',
      cat: 'rings',
      name: "(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 7.72جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 2,
      image: require("../../assets/Golds/ring2.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 9.01 جرام      ',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 3,
      image: require("../../assets/Golds/ring3.webp"),
      category: 'خواتم',
      cat: 'rings',

      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 8.88 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 4,
      image: require("../../assets/Golds/ring4.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: '(فرع المارينا) توينز تصميم عالمي ذهب عيار 18 الوزن 11.37 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 5,
      image: require("../../assets/Golds/ring5.webp"),
      category: 'خواتم',
      cat: 'rings',

      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 9.67 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 6,
      image: require("../../assets/Golds/ring6.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 6.82 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 7,
      image: require("../../assets/Golds/ring7.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 5.65 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 8,
      image: require("../../assets/Golds/ring8.webp"),
      category: 'خواتم',
      cat: 'rings',

      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 4.06 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 9,
      image: require("../../assets/Golds/ring9.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: '(فرع المارينا) خاتم ( دبله ) ذهب عيار 18 الوزن 7.54جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 10,
      image: require("../../assets/Golds/ring10.webp"),
      category: 'خواتم',

      cat: 'rings',
      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 10.95جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 11,
      image: require("../../assets/Golds/necklace1.webp"),
      category: 'خواتم',
      cat: 'necklace',
      name: '(فرع المارينا) خاتم تصميم عالمي ذهب عيار 18 الوزن 4.37جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 14,
      image: require("../../assets/Golds/necklace5.webp"),
      category: 'قلاده',

      cat: 'necklace',
      name: '(فرع المارينا) قلاده تصميم عالمي ذهب عيار 18 الوزن 10.02جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 15,
      image: require("../../assets/Golds/necklace6.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: '(فرع المارينا) قلاده تصميم عالمي ذهب عيار 18 الوزن 7.85جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 16,
      image: require("../../assets/Golds/necklace7.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: '(فرع المارينا) قلاده تصميم عالمي ذهب عيار 18 الوزن 26.07جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 17,
      image: require("../../assets/Golds/necklace8.webp"),
      category: 'قلاده',

      cat: 'necklace',
      name: '(فرع المارينا) قلاده ناعمه تصميم عالمي ذهب عيار 18 الوزن 4.88جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 18,
      image: require("../../assets/Golds/necklace9.webp"),
      category: 'قلاده',

      cat: 'necklace',
      name: '(فرع المارينا) قلاده ناعمه تصميم عالمي ذهب عيار 18 الوزن 10.3جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 19,
      image: require("../../assets/Golds/necklace10.webp"),
      category: 'قلاده',
      cat: 'necklace',

      name: '(فرع المارينا) قلاده ناعمه تصميم عالمي ذهب عيار 18 الوزن 5.96جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 20,
      image: require("../../assets/Golds/gaw1.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'فرع ( 2 ) معضد ذهب صافي صب عيار 21 الوزن 4.48 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 21,
      image: require("../../assets/Golds/gaw2.webp"),
      category: 'غوايش',
      cat: 'gweisha',

      name: 'فرع ( 2 ) معضد ذهب صافي عيار 21 الوزن 9.45 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 22,
      image: require("../../assets/Golds/gaw3.webp"),
      category: 'غوايش',
      cat: 'gweisha',

      name: 'فرع ( 2 ) معضد ذهب صافي عيار 21 الوزن 6.79 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 22,
      image: require("../../assets/Golds/gaw4.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'فرع ( 2 ) معضدين تركيبة ذهب صافي عيار 21 الوزن 19.37 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 23,
      image: require("../../assets/Golds/gaw5.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'فرع ( 2 ) معضد ذهب صب صافي عيار 21 الوزن 10.55 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 24,
      image: require("../../assets/Golds/gaw6.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'فرع ( 2 ) معضد ذهب صافي عيار 21 الوزن 7.02 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 25,
      image: require("../../assets/Golds/gaw7.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'فرع ( 2) معضد ذهب صافي عيار الوزن 6.59 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 26,
      image: require("../../assets/Golds/gaw8.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'فرع ( 2 ) معضد ذهب صافي عيار 21 الوزن 8.15جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 27,
      image: require("../../assets/Golds/gaw9.webp"),
      category: 'غوايش',

      cat: 'gweisha',
      name: 'فرع ( 2 ) معضد ذهب صافي عيار 21 الوزن 7.31جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 28,
      image: require("../../assets/Golds/gaw10.webp"),

      category: 'غوايش',
      cat: 'gweisha',
      name: 'فرع ( 2 ) معضد ذهب صافي عيار 21 الوزن 9.53 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 29,
      image: require("../../assets/Golds/bracelet1.webp"),

      category: 'اساور',
      cat: 'bracelets',
      name: '(فرع المارينا) انسيال تصميم عالمي ذهب عيار 18 الوزن 3.13 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 30,
      image: require("../../assets/Golds/bracelet2.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: '(فرع المارينا) اسواره تصميم عالمي ذهب عيار 18 الوزن 12.95جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 31,
      image: require("../../assets/Golds/bracelet3.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: '(فرع المارينا) اسواره تصميم عالمي ذهب عيار 18 الوزن 6.45جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 32,
      image: require("../../assets/Golds/bracelet4.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: '(فرع المارينا) اسواره تصميم عالمي ذهب عيار 18 الوزن 27.37جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 34,
      image: require("../../assets/Golds/bracelet5.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: '(فرع المارينا) انسيال تصميم عالمي ذهب عيار 18 الوزن 3.16جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 35,
      image: require("../../assets/Golds/bracelet6.webp"),
      category: 'اساور',

      cat: 'bracelets',
      name: '(فرع المارينا) انسيال تصميم عالمي ذهب عيار 18 الوزن 4.44جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 36,
      image: require("../../assets/Golds/bracelet7.webp"),
      category: 'اساور',
      cat: 'bracelets',

      name: '(فرع المارينا) انسيال تصميم عالمي ذهب عيار 18 الوزن 9.27 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 37,
      image: require("../../assets/Golds/bracelet8.webp"),
      category: 'اساور',
      cat: 'bracelets',

      name: '(فرع المارينا) انسيال تصميم عالمي ذهب عيار 18 الوزن 2.18 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 38,
      image: require("../../assets/Golds/bracelet9.jpg"),
      category: 'اساور',
      cat: 'bracelets',

      name: '(فرع المارينا) اسواره تصميم عالمي ذهب عيار 18 الوزن 9.13 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 39,
      image: require("../../assets/Golds/golpalm.webp"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: "(فرع المارينا) كف ذهب عيار 21 الوزن 16.69 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 40,
      image: require("../../assets/Golds/golpalm2.webp"),
      category: 'كفوف ذهب',

      cat: 'palm_gold',
      name: "(فرع المارينا) كف ذهب عيار 21 الوزن 14.88 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 41,
      image: require("../../assets/Golds/golpalm3.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: "(فرع المارينا) كف ناعم ايطالي ملون ذهب عيار 18 الوزن 4.34 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 42,
      image: require("../../assets/Golds/golpalm4.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: "(فرع المارينا) كف ناعم ايطالي ملون ذهب عيار 18 الوزن 3.56 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 43,
      image: require("../../assets/Golds/golpalm5.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: "(فرع المارينا) كف ناعم ايطالي ملون ذهب عيار 18 الوزن 3.61 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 44,
      image: require("../../assets/Golds/golpalm6.jpg"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: '(فرع المارينا) كف ناعم ايطالي ملون ذهب عيار 18 الوزن 4.08 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 45,
      image: require("../../assets/Golds/golpalm7.jpg"),
      category: 'كفوف ذهب',

      cat: 'palm_gold',
      name: '(فرع المارينا) كف ناعم ايطالي ملون ذهب عيار 18 الوزن 3.56جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 46,
      image: require("../../assets/Golds/golpalm8.webp"),
      category: 'كفوف ذهب',

      cat: 'palm_gold',
      name: '(فرع المارينا) كف ناعم ايطالي ملون ذهب عيار 18 الوزن 3.68 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 47,
      image: require("../../assets/Golds/golpalm9.webp"),
      category: 'كفوف ذهب',
      cat: 'palm_gold',

      name: '(فرع المارينا) كف ناعم ايطالي ملون ذهب عيار 18 الوزن 3.62 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 49,
      image: require("../../assets/Golds/goldchar1.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: "فرع (3) تعليقة ذهب حرف (ق) عيار 18 الوزن 1.97 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 50,
      image: require("../../assets/Golds/goldchar3.jpg"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: "فرع (2) تعليقة حرف ذهب عيار 18 الوزن 1.51 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 51,
      image: require("../../assets/Golds/goldchar4.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: "(فرع المارينا) تعليقه حرف ( H ) ذهب عيار 18 الوزن 2.85 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 52,
      image: require("../../assets/Golds/goldchar5.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: "(فرع المارينا) تعليقه حرف ( G ) ذهب عيار 18 الوزن 2.99 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 53,
      image: require("../../assets/Golds/goldchar6.jpg"),
      category: 'حروف ذهب',
      cat: 'char_gold',
      name: "(فرع المارينا) تعليقه حرف ( N ) ذهب عيار 18 الوزن 2.98 جرام",

      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 54,
      image: require("../../assets/Golds/goldchar7.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: "(فرع المارينا) تعليقه حرف ( B ) ذهب عيار 18 الوزن 3.07جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 55,
      image: require("../../assets/Golds/goldchar8.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: "(فرع المارينا) تعليقه حرف ( F ) ذهب عيار 18 الوزن 2.97جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 56,
      image: require("../../assets/Golds/goldchar9.webp"),
      category: 'حروف ذهب',
      cat: 'char_gold',

      name: "(فرع المارينا) تعليقه حرف ( R ) ذهب عيار 18 الوزن 3.3 جرام",
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 57,
      image: require("../../assets/Golds/earring3.webp"),
      category: 'حلق',
      cat: 'earring',

      name: '(فرع المارينا) حلق تصميم عالمي ذهب عيار 18الوزن 9.42 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 58,
      image: require("../../assets/Golds/earring4.webp"),
      category: 'حلق',

      cat: 'earring',
      name: '(فرع المارينا) حلق تصميم عالمي ذهب عيار 18 الوزن4.51 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 59,
      image: require("../../assets/Golds/earring5.webp"),
      category: 'حلق',
      cat: 'earring',
      name: '(فرع المارينا) حلق تصميم عالمي ذهب عيار 18 الوزن2.36 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 60,
      image: require("../../assets/Golds/earring6.webp"),
      category: 'حلق',
      cat: 'earring',
      name: '(فرع المارينا) حلق تصميم عالمي ذهب عيار 18 الوزن 9.39جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    },
    {
      id: 61,
      image: require("../../assets/Golds/earring6.webp"),
      category: 'حلق',
      cat: 'earring',
      name: '(فرع المارينا) حلق تصميم عالمي ورده ذهب عيار 18 الوزن 3.53 جرام',
      price: (1100 + Math.random() * 34).toFixed(3)
    }
  ]);

  const [client_data, setClientData] = useState({});

  const [selectedProducts, setselectedProducts] = useState([]);
  const [counter, setCounter] = useState(0);
  const [client_id, setClientId] = useState("");
  const [filtereddata, setfiltereddata] = useState([]);
  const [filteredCart, setfilteredCart] = useState({});
  const [selectedcate, setselectedcate] = useState("");
  const [itemId, setItemId] = useState(false);
  useEffect(() => {
    $("ul.tabs li").click(function () {
      var $this = $(this);
      var $theTab = $(this).attr("id");
      if ($this.hasClass("active")) {
        // do nothing
      } else {
        $this
          .closest(".tabs_wrapper")
          .find("ul.tabs li, .tabs_container .tab_content")
          .removeClass("active");
        $(
          '.tabs_container .tab_content[data-tab="' +
            $theTab +
            '"], ul.tabs li[id="' +
            $theTab +
            '"]'
        ).addClass("active");
      }
    });
    $(document).on("click", ".productset", function () {
      $(this).toggleClass("active");
    });
  });
  useEffect(() => {
    if (itemId) confirmText();
  }, [itemId]);
  useEffect(() => {
    if (selectedcate && selectedcate?.length) {
      setdata([
        ...originaldata?.filter((item) => item.category == selectedcate)
      ]);
    }
  }, [selectedcate, originaldata]);

  const confirmText = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      type: "warning",
      showLoaderOnConfirm: true,
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1
    }).then(function (t) {
      if (t.isConfirmed) {
        dispatch(
          removeFromCart({
            client_id,
            cart_id: filteredCart?.cart_id,
            element_id: itemId
          })
        );
      }
      t.value &&
        Swal.fire({
          showLoaderOnConfirm: true,
          type: "success",
          title: "تم المسح",
          text: "لقد تم حذف الملف الخاص بك.",
          confirmButtonClass: "btn btn-success"
        });
    });
  };
  useEffect(() => {
    if (selectedcate && selectedcate?.length) {
      setdata([
        ...originaldata?.filter((item) => item.category == selectedcate)
      ]);
    }
  }, [originaldata]);
  useEffect(() => {
    setfilteredCart(cart?.filter((item) => item?.client_id == client_id)[0]);
    originaldata?.map((item) => (item.active = false));
    setoriginaldata([...originaldata]);
  }, [client_id, cart]);
  useEffect(() => {
    setfiltereddata(
      cart?.filter((item) => item?.client_id == client_id)[0]?.elements
    );
  }, [filteredCart, cart]);
  useEffect(() => {
    originaldata?.map((item) => {
      filtereddata?.map((f_item) => {
        if (item?.id == f_item?.id) {
          item.active = true;
        }
      });
    });
    setoriginaldata([...originaldata]);
  }, [filtereddata]);
  return (
    <>
      <div className="main-wrappers">
        <Header />
        <div style={{ margin: '0px' }} className="page-wrapper ms-0">
          <div className="content">
            <div className="row">
              <POS
                updatedata={() => null}
                originaldata={originaldata}
                data={data}
                setdata={setdata}
                setselectedProducts={setselectedProducts}
                selectedProducts={selectedProducts}
                selectedcatfunc={() => null}
                handleupdatecat={() => null}
                setselectedcate={setselectedcate}
                selectedcate={selectedcate}
                client_id={client_id}
              />
              <div className="col-lg-4 col-sm-12 ">
                <div className="order-list">
                  <div className="orderid">
                    <h4>قائمة الطلبات</h4>
                    {/* <h5>رقم التحويل: #65565</h5> */}
                  </div>
                  {/* <div className="actionproducts">
                    <ul>
                      <li>
                        <Link
                          to="#"
                          className="deletebg confirm-text"
                          onClick={confirmText}
                        >
                          <img src={delete2} alt="img" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="dropset"
                        >
                          <img src={ellipise1} alt="img" />
                        </Link>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                          data-popper-placement="bottom-end"
                        >
                          <li>
                            <Link to="#" className="dropdown-item">
                              أمر
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              أمر أخر
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              شئ أخر
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div> */}
                </div>
                <div className="card card-order">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <Link
                          to="#"
                          className="btn btn-adds"
                          data-bs-toggle="modal"
                          data-bs-target="#create"
                        >
                          {"  "}{" "}
                          <i
                            className="fa fa-plus me-2"
                            style={{ margin: "0 5px" }}
                          />{" "}
                          <span>إضافة عميل</span>{" "}
                        </Link>
                      </div>
                      <div className="col-lg-12">
                        <div className="select-split ">
                          <div className="select-group w-100">
                            <Select2
                              className="select"
                              onChange={(e) => setClientId(e?.target?.value)}
                              data={clients.map((item) => {
                                return {
                                  id: item?.client_cart_id,
                                  text: item?.name
                                };
                              })}
                              value={client_id}
                              options={{
                                placeholder: "العملاء"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="select-split">
                          <div className="select-group w-100">
                            <Select2
                              className="select"
                              data={options1}
                              options={{
                                placeholder: "المنتج"
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-12">
                        <div className="text-end">
                          <Link to="#" className="btn btn-scanner-set">
                            <img src={scanner1} alt="img" className="me-2" />
                              فحص الباركود
                          </Link>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0">
                    <div className="totalitem">
                      <h4>
                        العدد الكى :{" "}
                        {filteredCart?.cart_total_quantity
                          ? filteredCart?.cart_total_quantity
                          : 0}
                      </h4>
                      <Link
                        to="#"
                        onClick={() => {
                          dispatch(
                            removeCart({ cart_id: filteredCart?.cart_id })
                          );
                        }}
                      >
                        مسح الكل
                      </Link>
                    </div>
                    <div className="product-table">
                      {filtereddata?.map((item, index) => {
                        return (
                          <ul key={index} className="product-lists">
                            <li>
                              <div className="productimg">
                                <div className="productimgs">
                                  <img src={item.image} alt="img" />
                                </div>
                                <div className="productcontet">
                                  <h4>{item.name}</h4>
                                  <div className="productlinkset">
                                    <h5>{item.category}</h5>
                                  </div>
                                  <div className="increment-decrement">
                                    <div className="input-groups">
                                      <input
                                        onClick={() =>
                                          dispatch(
                                            updateCart({
                                              client_id,
                                              cart_id: filteredCart?.cart_id,
                                              element_id: item?.id,
                                              type: "-"
                                            })
                                          )
                                        }
                                        type="button"
                                        defaultValue="-"
                                        className="button-minus dec button"
                                      />
                                      <input
                                        type="text"
                                        name="child"
                                        value={item?.quantity}
                                        className="quantity-field"
                                      />
                                      <input
                                        onClick={() =>
                                          dispatch(
                                            updateCart({
                                              client_id,
                                              cart_id: filteredCart?.cart_id,
                                              element_id: item?.id,
                                              type: "+"
                                            })
                                          )
                                        }
                                        type="button"
                                        defaultValue="+"
                                        className="button-plus inc button "
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>{item.price}$ </li>
                            <li>
                              <Link
                                to="#"
                                className="confirm-text"
                                onClick={() => {
                                  setItemId(item?.id);
                                }}
                              >
                                <img src={delete2} alt="img" />
                              </Link>
                            </li>
                          </ul>
                        );
                      })}
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0 pb-2">
                    <div className="setvalue">
                      <ul>
                        <li>
                          <h5>المجموع الفرعي </h5>
                          <h6>
                            {filteredCart?.cart_total_price
                              ? filteredCart?.cart_total_price
                              : 0}
                            $
                          </h6>
                        </li>
                        <li>
                          <h5>الضرائب </h5>
                          <h6>
                            {filteredCart?.cart_total_price
                              ? filteredCart?.cart_total_price
                              : 0 * (5 / 100)}
                            $
                          </h6>
                        </li>
                        <li className="total-value">
                          <h5>السعر الكلى</h5>
                          <h6>
                            {filteredCart?.cart_total_price
                              ? filteredCart?.cart_total_price
                              : 0 + filteredCart?.cart_total_price
                              ? filteredCart?.cart_total_price
                              : 0 * (5 / 100)}
                            $
                          </h6>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="setvaluecash">
                      <ul>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={cash} alt="img" className="me-2" />
                            Cash
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={debitcard} alt="img" className="me-2" />
                            Debit
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={scan} alt="img" className="me-2" />
                            فحص
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                    <div
                      className="btn-totallabel"
                      style={{ cursor: "pointer" }}
                    >
                      <h5>الدفع</h5>
                      <h6>
                        {" "}
                        {filteredCart?.cart_total_price
                          ? filteredCart?.cart_total_price
                          : 0 + filteredCart?.cart_total_price
                          ? filteredCart?.cart_total_price
                          : 0 * (5 / 100)}
                        $
                      </h6>
                    </div>
                    {/* <div className="btn-pos">
                      <ul>
                        <li>
                          <Link to="#" className="btn">
                            <img src={pause1} alt="img" className="me-1" />
                            أوقف
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={Edit6} alt="img" className="me-1" />
                            سؤال
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={trash12} alt="img" className="me-1" />
                            تجنب
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={wallet1} alt="img" className="me-1" />
                            دفع
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#recents"
                          >
                            <img src={transcation} alt="img" className="me-1" />{" "}
                            تحويل
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="create"
        tabIndex={-1}
        aria-labelledby="create"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">إنشاء</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>إسم العميل</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setClientData({ ...client_data, name: e.target.value });
                      }}
                      value={client_data?.name}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>الهاتف</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setClientData({
                          ...client_data,
                          phone: e.target.value
                        });
                      }}
                      value={client_data?.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Link
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  to="#"
                  className="btn btn-submit me-2"
                  onClick={() => {
                    dispatch(addClient(client_data));
                    setClientData({});
                  }}
                >
                  تسجيل
                </Link>
                <Link to="#" className="btn btn-cancel" data-bs-dismiss="modal">
                  إلغاء
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transactions />
    </>
  );
};

export default Pos;
