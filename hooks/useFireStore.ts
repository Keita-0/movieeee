import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { DateFormat } from "./useDateFormat";
import { Review } from "../types/Review";

type Movie = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
};

type Review2 = {
  title: string;
  id: string;
  rate: number;
  comment: string;
  photo: string;
};

export const getData = async (): Promise<Movie[]> => {
  const movies: Movie[] = [];
  const auth = getAuth();
  const user = auth.currentUser;
  const uid: any = user?.uid;
  const q = query(collection(db, "BookMarkMovie"), where("user", "in", [uid]));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const movie: Movie = {
      id: 0,
      title: "",
      overview: "",
      vote_average: 0,
      poster_path: "",
      release_date: "",
    };
    movie.id = doc.data().id;
    movie.title = doc.data().title;
    movie.overview = doc.data().synopsis;
    movie.vote_average = doc.data().vote_average;
    movie.poster_path = doc.data().photo;
    movie.release_date = doc.data().release_date;
    movies.push(movie);
  });

  return movies;
};

//ブックマークした映画か判定
export const checkMark = async (movie: any): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;
  const docRef = doc(db, "BookMarkMovie", uid + "_" + movie.id);
  const docSnap = await getDoc(docRef);

  try {
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw e;
  }
};

//映画をブックマークに追加
export const insertBookMark = async (
  movie: any,
  setParam: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  try {
    await setDoc(doc(db, "BookMarkMovie", uid + "_" + movie.id), {
      user: uid,
      id: movie.id,
      title: movie.title,
      photo: movie.poster_path
        ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`
        : "",
      synopsis: movie.overview,
      vote_average: movie.vote_average,
      release_date: DateFormat(movie.release_date),
    }).catch((e) => {
      console.log("失敗1");
    });
    setParam(true);
  } catch (e) {
    throw e;
  }
};

//映画をブックマークから削除
export const deleteBookMark = async (
  movie: any,
  setParam: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  try {
    await deleteDoc(doc(db, "BookMarkMovie", uid + "_" + movie.id));
    setParam(false);
  } catch (e) {
    throw e;
  }
};

export const checkReview = async (movie: any): Promise<boolean> => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;
  const docRef = doc(db, "Review", uid + "_" + movie.id);
  const docSnap = await getDoc(docRef);

  try {
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw e;
  }
};

//映画のレビュー追加
export const insertReview = async (movie: any, review: Review) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  try {
    await setDoc(doc(db, "Review", uid + "_" + movie.id), {
      user: uid,
      id: movie.id,
      title: movie.title,
      photo: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`,
      rate: review.rate,
      comment: review.comment,
    }).catch((e) => {
      throw e;
    });
    return true;
  } catch (e) {
    throw e;
  }
};

export const getReviewData = async (id: any) => {
  let review = { rate: "0", comment: "" };
  const auth = getAuth();
  const user = auth.currentUser;
  const uid: any = user?.uid;
  const docRef = doc(db, "Review", uid + "_" + id);
  const querySnapshot = await getDoc(docRef);

  if (querySnapshot.exists()) {
    review.rate = querySnapshot.data().rate;
    review.comment = querySnapshot.data().comment;
  } else {
    // doc.data() がUndefinedの場合の処理
    console.log("No such document!");
  }

  return review;
};

//映画をブックマークから削除
export const deleteReview = async (id: number) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user?.uid;

  try {
    await deleteDoc(doc(db, "Review", uid + "_" + id));
    return false;
  } catch (e) {
    throw e;
  }
};

export const getReviewLists = async (): Promise<Review2[]> => {
  const reviews: Review2[] = [];
  const auth = getAuth();
  const user = auth.currentUser;
  const uid: any = user?.uid;
  const q = query(collection(db, "Review"), where("user", "in", [uid]));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const review: Review2 = {
      title: "",
      id: "",
      rate: 0,
      comment: "",
      photo: "",
    };
    review.title = doc.data().title;
    review.id = doc.data().id;
    review.rate = doc.data().rate;
    review.comment = doc.data().comment;
    review.photo = doc.data().photo;
    reviews.push(review);
  });

  return reviews;
};
