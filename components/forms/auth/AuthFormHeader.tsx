// Importation des composants et dépendances nécessaires
import { HomeModernIcon } from "@heroicons/react/24/solid";  // Icône de maison de Heroicons
import Link from "next/link";  // Composant Link de Next.js pour la navigation
import React from "react"

// Définition du type pour les props du composant
type FormHeaderProps = {
  title?: string;      // Titre optionnel (?)
  staticText?: string; // Texte statique optionnel
  linkText?: string;   // Texte du lien optionnel
  linkHref?: string;   // URL du lien optionnel
  icon?: boolean;
};

// Définition du composant avec destructuration des props
function AuthFormHeader({
  title,
  staticText,
  linkHref,
  linkText,
  icon = true,
}: FormHeaderProps) {
  return (
    // Conteneur principal avec classe responsive
    <div className="px-4 sm:mx-auto sm:w-full sm:max-w-md sm:px-6 lg:px-8">
      {/* Icône de maison centrée */}
      {icon && ( <HomeModernIcon className="mx-auto size-16 dark:text-lime-500" />) }

      {/* Titre avec style personnalisé */}
      <h2 className="text-baby_richBlack h2-bold font-robotoSlab dark:text-pumpkin mt-3 text-center">
        {title}
      </h2>

      {/* Rendu conditionnel du paragraphe avec texte statique et lien */}
      {(staticText || linkText) && linkHref && (
        <p className="dark:text-platinum mt-4 text-center text-lg">
          {/* Affiche le texte statique s'il existe */}
          {staticText && <span>{staticText}</span>}

          {/* Rendu conditionnel du lien */}
          {linkText && (
            <Link
              href={linkHref}
              className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-lime-500 dark:hover:text-indigo-500"
            >
              {linkText}
            </Link>
          )}
        </p>
      )}
    </div>
  );
}

export default React.memo(AuthFormHeader)