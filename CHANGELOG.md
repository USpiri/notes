# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Incoming changes and features.

### Added

<!-- - **Drag&Drop**: Drag and drop notes, folders and editor components. -->

- **Image display**: Add image display.

## [1.3.0] | 15-05-2024

### Added

- **Link menu**: Edit, create or delete links from a "_On Link Hover_" floating menu.
- **Persistant config store**: Stores and persists the editor settings locally.
- **Bubble Menu**: "_On Text Hover_" bubble menu.
- **Inline Editor**: New editor setting to hide the Editor MenuBar.

### Changed

- **Link Popover**: Link button on the Editor MenuBar now make use of LinkPopover to create or edit a link.
- Disabled edit mode setting (bugged).

### Fixed

- **Max height folders and sidebar**: The folders had a maximum height seted and the sidebar did not render correctly when there were more than 6 notes/folders.
- **Callout style**: Titles and inline code.

## [1.2.1] | 08-05-2024

### Added

- **Default notes**: Special `id` notes: changelog, math, routing, syntax.
- **Internal note reference**: Link between notes with `note=<note_id>`.

### Fixed

- **Sidebar selected note**: Does not higlight the current note.

## [1.2.0] | 06-05-2024

Implementation of internal links and improvement in local storage management.

### Added

- **Route based notes**

- **Internal or external links**: Identification of internal or external links. Internal links are preloaded.

### Changed

- Sidebar will remain closed or open and the state will be saved.

### Fixed

- **Latex on Codeblocks**: Bug that prevented write $ signs inside codeblocks or inline code.

## [1.1.0] | 03-05-2024

### Added

- **Latex support**: Math expressions with KaTeX.

### Changed

- **Inline Codeblick Style**

## [1.0.0] | 29-04-2024

This release marks the start of traking changes. It is a summary of all deployments made and not tracked.

### Added

- **TipTap**
- **Editor Menu**
- **Plugin StarterKit**
- **Plugin SlashCommand**
- **Plugin Callout**
- **Plugin TaskList**
- **Plugin LowlightCodeblock**
- **Notes & Folder**
- **Sidebar**
- **LocalStorage**
