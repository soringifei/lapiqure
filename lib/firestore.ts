import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  type QueryConstraint 
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase';
import type { Collection, Piece } from './types';

export async function getCollections(): Promise<Collection[]> {
  return [];
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return null;
}

export async function getPiecesByCollection(collectionId: string): Promise<Piece[]> {
  return [];
}

export async function getAllPieces(): Promise<Piece[]> {
  return [];
}

export async function getPieceBySlug(slug: string): Promise<Piece | null> {
  return null;
}
