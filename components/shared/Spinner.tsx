import clsx from "clsx";               /* Utilitaire pour gérer les noms de classes CSS de manière conditionnelle */
import { useTheme } from "next-themes"; /* Hook pour gérer le thème (clair/sombre) */
import Image from "next/image";         /* Composant optimisé pour les images dans Next.js */


interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";    /* Propriété optionnelle (?) qui accepte uniquement ces 4 valeurs */
}

/* Objet qui mappe les tailles aux classes Tailwind CSS correspondantes */
const sizeClasses = {
  sm: "size-10",    // Petit spinner
  md: "size-20",    // Spinner moyen (par défaut)
  lg: "size-32",    // Grand spinner
  xl: "size-52",    // Très grand spinner
};

/* Définition du composant Spinner avec destructuration des props */
export default function Spinner({ size = "md" }: SpinnerProps) {
  /* Récupération du thème actuel via le hook useTheme */
  const { theme } = useTheme();

  /* Construction de la classe CSS avec clsx */
  const className = clsx(
    "animate-spin",         // Animation de rotation
    sizeClasses[size]      // Classe de taille correspondante
  );

  /* Mapping des dimensions en pixels pour chaque taille */
  const dimensionMap = {
    sm: 40,
    md: 80,
    lg: 128,
    xl: 208,
  };

  /* Récupération de la dimension en pixels selon la taille */
  const widthHeight = dimensionMap[size];

  /* Choix de l'image du spinner selon le thème */
  const spinnerSrc =
    theme === "dark"
      ? "/assets/icons/loading-dark.svg"    // Image pour le thème sombre
      : "/assets/icons/loading-light.svg";  // Image pour le thème clair

  return (
    <div role="status">
      <Image
        className={className}               // Classes CSS dynamiques
        src={spinnerSrc}                   // Source de l'image selon le thème
        alt="Loading..."                   // Texte alternatif pour l'accessibilité
        width={widthHeight}                // Largeur dynamique
        height={widthHeight}               // Hauteur dynamique
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}