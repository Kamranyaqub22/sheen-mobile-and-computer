function repair(id, name, price, turnaround, warranty, notes) {
  return {
    id,
    name,
    price,
    turnaround,
    warranty,
    notes,
  }
}

function model(id, slug, name, summary, turnaround, repairs) {
  return {
    id,
    slug,
    name,
    summary,
    turnaround,
    repairs,
  }
}

function brand(id, slug, name, summary, models) {
  return {
    id,
    slug,
    name,
    summary,
    models,
  }
}

function category(id, slug, name, summary, heroTitle, heroBody, accent, brands) {
  return {
    id,
    slug,
    name,
    summary,
    heroTitle,
    heroBody,
    accent,
    brands,
  }
}

export const seedCatalog = [
  category(
    'category-phones',
    'phones',
    'Phones',
    'Fast-moving phone repairs for walk-ins, same-day fixes, and common faults.',
    'Phone repairs arranged by brand, model, and fault',
    'Browse the phone brand, choose the exact model, and then pick the repair service that matches the issue. Each model can carry its own pricing, turnaround time, and warranty notes.',
    'Most same-day jobs',
    [
      brand(
        'brand-apple-phones',
        'apple',
        'Apple',
        'iPhone screen, battery, charging, back glass, and camera repairs.',
        [
          model(
            'model-iphone-15',
            'iphone-15',
            'iPhone 15',
            'OLED display repairs, battery swaps, camera lens work, and charging issues.',
            '45 to 90 minutes for common jobs',
            [
              repair('repair-iphone-15-screen', 'Screen Replacement', 149, '60 to 90 minutes', '12-month part warranty', 'Premium OLED assembly fitted and tested in store.'),
              repair('repair-iphone-15-battery', 'Battery Service', 89, '45 minutes', '12-month part warranty', 'Battery health reset and power cycle test included.'),
              repair('repair-iphone-15-charge', 'Charging Port Repair', 99, '90 minutes', '6-month repair warranty', 'Includes lint clean-out and dock connector diagnostics.'),
            ],
          ),
          model(
            'model-iphone-14-pro',
            'iphone-14-pro',
            'iPhone 14 Pro',
            'Front glass, battery, rear glass, and camera service for premium iPhone models.',
            'Most repairs completed same day',
            [
              repair('repair-iphone-14-pro-screen', 'Screen Replacement', 199, '90 minutes', '12-month part warranty', 'True tone setup and display calibration carried out on collection.'),
              repair('repair-iphone-14-pro-back-glass', 'Back Glass Repair', 129, '2 to 3 hours', '6-month repair warranty', 'Laser-assisted glass removal for a cleaner finish.'),
              repair('repair-iphone-14-pro-camera', 'Rear Camera Repair', 119, '2 hours', '12-month part warranty', 'Ideal for lens cracks, shake issues, or focus failure.'),
            ],
          ),
          model(
            'model-iphone-13',
            'iphone-13',
            'iPhone 13',
            'Popular walk-in model with strong parts availability for same-day repairs.',
            'Same-day availability on most faults',
            [
              repair('repair-iphone-13-screen', 'Screen Replacement', 119, '45 to 60 minutes', '12-month part warranty', 'Cracked glass, touch failure, lines, and black display faults covered.'),
              repair('repair-iphone-13-battery', 'Battery Service', 79, '45 minutes', '12-month part warranty', 'Recommended for battery health under 80%.'),
              repair('repair-iphone-13-liquid', 'Liquid Damage Diagnostic', 39, '24 to 48 hours', 'Diagnostic only', 'Board-level assessment with quote before further work.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-samsung-phones',
        'samsung',
        'Samsung',
        'Galaxy S, A, and Fold repairs with display, battery, and charging coverage.',
        [
          model(
            'model-galaxy-s24',
            'galaxy-s24',
            'Galaxy S24',
            'Fast repairs for cracked displays, camera damage, and charging faults.',
            'Most jobs completed same day',
            [
              repair('repair-s24-screen', 'Screen Replacement', 179, '2 hours', '12-month part warranty', 'Frame-mounted service with post-repair display checks.'),
              repair('repair-s24-battery', 'Battery Service', 89, '90 minutes', '12-month part warranty', 'Charging performance and battery health tested before handover.'),
              repair('repair-s24-camera-lens', 'Camera Lens Repair', 59, '60 minutes', '6-month repair warranty', 'Good for shattered lens glass with intact camera module.'),
            ],
          ),
          model(
            'model-galaxy-s23',
            'galaxy-s23',
            'Galaxy S23',
            'Walk-in repair coverage for screen, charging port, and rear glass.',
            'Same-day on stocked parts',
            [
              repair('repair-s23-screen', 'Screen Replacement', 169, '2 hours', '12-month part warranty', 'Display and frame assembly option for a better finish.'),
              repair('repair-s23-charge', 'Charging Port Repair', 89, '90 minutes', '6-month repair warranty', 'Loose cable fit, no-charge, and moisture warnings diagnosed.'),
              repair('repair-s23-back', 'Back Glass Repair', 79, '90 minutes', '6-month repair warranty', 'Ideal for cracked rear glass without frame damage.'),
            ],
          ),
          model(
            'model-galaxy-a54',
            'galaxy-a54',
            'Galaxy A54',
            'Mid-range Samsung model with high demand for display and battery repairs.',
            'Often completed within the day',
            [
              repair('repair-a54-screen', 'Screen Replacement', 129, '2 hours', '12-month part warranty', 'Bright replacement assembly fitted and tested in workshop.'),
              repair('repair-a54-battery', 'Battery Service', 69, '60 minutes', '12-month part warranty', 'Useful for short battery life and random shutdown issues.'),
              repair('repair-a54-speaker', 'Speaker Repair', 59, '60 minutes', '6-month repair warranty', 'For low audio output, distortion, or water-related corrosion.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-google-phones',
        'google',
        'Google',
        'Pixel repairs with OLED displays, batteries, USB-C faults, and cameras.',
        [
          model(
            'model-pixel-8',
            'pixel-8',
            'Pixel 8',
            'Premium Google model with display, battery, and camera support.',
            'Booked same-day when parts are in stock',
            [
              repair('repair-pixel8-screen', 'Screen Replacement', 169, '2 hours', '12-month part warranty', 'For cracked OLED screens, touch loss, or display bleed.'),
              repair('repair-pixel8-battery', 'Battery Service', 89, '90 minutes', '12-month part warranty', 'Helps with weak battery life and unexpected restart faults.'),
              repair('repair-pixel8-camera', 'Rear Camera Repair', 109, '2 hours', '12-month part warranty', 'For blur, camera crash, or broken lens glass.'),
            ],
          ),
          model(
            'model-pixel-7',
            'pixel-7',
            'Pixel 7',
            'Reliable repair coverage for screen, battery, and charging faults.',
            'Same-day when booked early',
            [
              repair('repair-pixel7-screen', 'Screen Replacement', 149, '2 hours', '12-month part warranty', 'Display fitted with touch and frame checks before release.'),
              repair('repair-pixel7-charge', 'Charging Port Repair', 79, '90 minutes', '6-month repair warranty', 'For slow charging, no connection, or damaged port housing.'),
              repair('repair-pixel7-mic', 'Microphone Repair', 69, '60 minutes', '6-month repair warranty', 'Useful when callers cannot hear you clearly.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-oneplus-phones',
        'oneplus',
        'OnePlus',
        'OnePlus flagship and Nord repairs with strong demand for screens, batteries, and port fixes.',
        [
          model(
            'model-oneplus-12',
            'oneplus-12',
            'OnePlus 12',
            'Fast turnaround repairs for curved OLED screens, battery wear, and charging faults.',
            'Most booked jobs completed same day',
            [
              repair('repair-op12-screen', 'Screen Replacement', 189, '2 hours', '12-month part warranty', 'High-brightness OLED assembly with frame alignment check.'),
              repair('repair-op12-battery', 'Battery Service', 89, '75 minutes', '12-month part warranty', 'Restores day-long battery life and stabilises fast charging.'),
              repair('repair-op12-charge', 'Charging Port Repair', 99, '90 minutes', '6-month repair warranty', 'Useful when the cable fit is loose or charging drops in and out.'),
            ],
          ),
          model(
            'model-oneplus-nord4',
            'oneplus-nord-4',
            'OnePlus Nord 4',
            'Popular mid-range handset with common display and camera repair work.',
            'Same-day on stocked parts',
            [
              repair('repair-nord4-screen', 'Screen Replacement', 139, '90 minutes', '12-month part warranty', 'For impact damage, dead touch areas, and dark display faults.'),
              repair('repair-nord4-battery', 'Battery Service', 69, '60 minutes', '12-month part warranty', 'Ideal for degraded battery health or charge drops under load.'),
              repair('repair-nord4-camera', 'Rear Camera Repair', 79, '90 minutes', '12-month part warranty', 'Resolves focus failure, lens cracks, and image shake issues.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-xiaomi-phones',
        'xiaomi',
        'Xiaomi',
        'Xiaomi and Redmi repairs for cracked displays, batteries, charging, and camera issues.',
        [
          model(
            'model-xiaomi-14',
            'xiaomi-14',
            'Xiaomi 14',
            'Current Xiaomi flagship with demand for screen, battery, and port work.',
            'Most common repairs completed same day',
            [
              repair('repair-xiaomi14-screen', 'Screen Replacement', 179, '2 hours', '12-month part warranty', 'Bright AMOLED replacement fitted with post-repair display checks.'),
              repair('repair-xiaomi14-battery', 'Battery Service', 85, '75 minutes', '12-month part warranty', 'Useful when battery health is falling or fast charge feels inconsistent.'),
              repair('repair-xiaomi14-charge', 'Charging Port Repair', 95, '90 minutes', '6-month repair warranty', 'For intermittent charging, cable wobble, and dock damage.'),
            ],
          ),
          model(
            'model-redmi-note-13-pro',
            'redmi-note-13-pro',
            'Redmi Note 13 Pro',
            'High-volume repair model with strong demand for displays, speakers, and battery swaps.',
            'Often repaired within the day',
            [
              repair('repair-redmi13-screen', 'Screen Replacement', 129, '90 minutes', '12-month part warranty', 'For cracks, ghost touch, or no image after drops.'),
              repair('repair-redmi13-battery', 'Battery Service', 65, '60 minutes', '12-month part warranty', 'Improves short run time and sudden shutdown behaviour.'),
              repair('repair-redmi13-speaker', 'Speaker Repair', 55, '60 minutes', '6-month repair warranty', 'Handles muffled sound, crackle, and low speaker output.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-oppo-phones',
        'oppo',
        'Oppo',
        'Oppo screen, charging, camera, and battery support for Find and Reno models.',
        [
          model(
            'model-find-x7-ultra',
            'find-x7-ultra',
            'Find X7 Ultra',
            'Premium Oppo handset suited to display, camera, and battery repairs.',
            'Booked same-day where parts are available',
            [
              repair('repair-findx7-screen', 'Screen Replacement', 199, '2 hours', '12-month part warranty', 'Curved OLED assembly fitted and sealed with frame checks.'),
              repair('repair-findx7-camera', 'Rear Camera Repair', 119, '2 hours', '12-month part warranty', 'Recommended for lens cracks, focus issues, and camera shake.'),
              repair('repair-findx7-battery', 'Battery Service', 89, '75 minutes', '12-month part warranty', 'Restores battery life for heavy-use flagship devices.'),
            ],
          ),
          model(
            'model-reno-11-f',
            'reno-11-f',
            'Reno 11 F',
            'Popular Reno repair model with walk-in demand for display and charge faults.',
            'Same-day on common repairs',
            [
              repair('repair-reno11-screen', 'Screen Replacement', 129, '90 minutes', '12-month part warranty', 'For cracked glass, touch issues, or black display faults.'),
              repair('repair-reno11-charge', 'Charging Port Repair', 79, '75 minutes', '6-month repair warranty', 'For no-charge faults and loose cable connections.'),
              repair('repair-reno11-battery', 'Battery Service', 69, '60 minutes', '12-month part warranty', 'Improves poor battery life and heat-related drain.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-huawei-phones',
        'huawei',
        'Huawei',
        'Huawei phone repair coverage for screens, charging, cameras, and battery faults.',
        [
          model(
            'model-p60-pro',
            'p60-pro',
            'P60 Pro',
            'Premium Huawei model with strong demand for display and camera service.',
            'Booked same-day or next-slot repairs',
            [
              repair('repair-p60-screen', 'Screen Replacement', 189, '2 hours', '12-month part warranty', 'Curved OLED panel fitted and tested with touch calibration.'),
              repair('repair-p60-camera', 'Rear Camera Repair', 109, '2 hours', '12-month part warranty', 'Good for focus failure, blurry capture, or cracked lens glass.'),
              repair('repair-p60-battery', 'Battery Service', 79, '75 minutes', '12-month part warranty', 'Suitable for weak battery life and sudden percentage drops.'),
            ],
          ),
          model(
            'model-nova-12-se',
            'nova-12-se',
            'Nova 12 SE',
            'Common mid-range repair model with display, battery, and charging issues.',
            'Often completed within the day',
            [
              repair('repair-nova12-screen', 'Screen Replacement', 129, '90 minutes', '12-month part warranty', 'For impact cracks, no touch, and display bleed.'),
              repair('repair-nova12-battery', 'Battery Service', 65, '60 minutes', '12-month part warranty', 'Improves battery endurance and daily reliability.'),
              repair('repair-nova12-charge', 'Charging Port Repair', 75, '75 minutes', '6-month repair warranty', 'For damaged ports, charging drops, and connection issues.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-motorola-phones',
        'motorola',
        'Motorola',
        'Motorola Edge and G-series repairs for screens, batteries, and speaker or charging issues.',
        [
          model(
            'model-edge-50-pro',
            'edge-50-pro',
            'Edge 50 Pro',
            'Flagship Motorola device with same-day repair demand for display and battery work.',
            'Most stocked jobs completed same day',
            [
              repair('repair-edge50-screen', 'Screen Replacement', 169, '2 hours', '12-month part warranty', 'Curved display repair with fit and brightness checks.'),
              repair('repair-edge50-battery', 'Battery Service', 79, '75 minutes', '12-month part warranty', 'Improves battery health and charge stability.'),
              repair('repair-edge50-camera', 'Rear Camera Repair', 89, '90 minutes', '12-month part warranty', 'For lens damage, focus issues, or shaky image capture.'),
            ],
          ),
          model(
            'model-moto-g84',
            'moto-g84',
            'Moto G84',
            'Affordable Motorola model with frequent screen, battery, and speaker faults.',
            'Usually repaired the same day',
            [
              repair('repair-g84-screen', 'Screen Replacement', 119, '90 minutes', '12-month part warranty', 'For broken screens, unresponsive touch, or no backlight.'),
              repair('repair-g84-battery', 'Battery Service', 59, '60 minutes', '12-month part warranty', 'Suitable when the phone drains quickly or shuts down early.'),
              repair('repair-g84-speaker', 'Speaker Repair', 49, '60 minutes', '6-month repair warranty', 'Clears crackle, low output, and audio distortion faults.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-nokia-phones',
        'nokia',
        'Nokia',
        'Nokia repairs for rugged and everyday models with display, battery, and charging coverage.',
        [
          model(
            'model-xr21',
            'xr21',
            'Nokia XR21',
            'Rugged handset repairs for cracked displays, weak batteries, and charging issues.',
            'Most diagnostics and common repairs completed same day',
            [
              repair('repair-xr21-screen', 'Screen Replacement', 139, '90 minutes', '12-month part warranty', 'For broken front glass, black display, or no touch response.'),
              repair('repair-xr21-battery', 'Battery Service', 69, '60 minutes', '12-month part warranty', 'Recommended for reduced endurance and unstable charging behaviour.'),
              repair('repair-xr21-charge', 'Charging Port Repair', 79, '75 minutes', '6-month repair warranty', 'For loose USB-C ports or intermittent charging.'),
            ],
          ),
          model(
            'model-g42',
            'g42',
            'Nokia G42',
            'Budget-friendly Nokia model with frequent walk-in repairs for screens and batteries.',
            'Often finished within the day',
            [
              repair('repair-g42-screen', 'Screen Replacement', 99, '75 minutes', '12-month part warranty', 'Fixes cracked display units and touch failure.'),
              repair('repair-g42-battery', 'Battery Service', 55, '60 minutes', '12-month part warranty', 'Helps with short battery life and sudden power loss.'),
              repair('repair-g42-microphone', 'Microphone Repair', 49, '60 minutes', '6-month repair warranty', 'For muffled calls and intermittent voice pickup issues.'),
            ],
          ),
        ],
      ),
    ],
  ),
  category(
    'category-laptops',
    'laptops-macbooks',
    'Laptops & MacBooks',
    'Structured coverage for Apple and Windows laptops with repair-specific pricing.',
    'Laptop and MacBook jobs organised for quoting and booking',
    'Use separate brand and model pages so every laptop can carry the right screen, battery, keyboard, or board-level pricing instead of broad generic estimates.',
    'Assessment first, then repair',
    [
      brand(
        'brand-apple-laptops',
        'apple',
        'Apple',
        'MacBook Air and MacBook Pro repairs with diagnostics, screens, batteries, and liquid damage work.',
        [
          model(
            'model-mba-13-m2',
            'macbook-air-13-m2',
            'MacBook Air 13 M2',
            'Modern Apple notebook with common display, battery, and liquid-damage enquiries.',
            'Diagnostics same day, parts-based jobs next available slot',
            [
              repair('repair-mba-screen', 'Screen Replacement', 349, '1 to 2 days', '12-month part warranty', 'Display assembly fit with post-repair camera and hinge checks.'),
              repair('repair-mba-battery', 'Battery Replacement', 199, 'Same day on booking', '12-month part warranty', 'Battery health and cycle reporting checked after repair.'),
              repair('repair-mba-liquid', 'Liquid Damage Diagnostic', 49, '24 to 48 hours', 'Diagnostic only', 'Board cleaning and quote provided before any component-level work.'),
            ],
          ),
          model(
            'model-mbp-14-m3',
            'macbook-pro-14-m3',
            'MacBook Pro 14 M3',
            'High-value Apple model with careful diagnostics and premium part pricing.',
            'Booked diagnostics and parts ordering as needed',
            [
              repair('repair-mbp-screen', 'Screen Replacement', 589, '2 to 3 days', '12-month part warranty', 'For impact damage, pressure marks, no image, or flicker faults.'),
              repair('repair-mbp-keyboard', 'Keyboard Repair', 279, '1 to 2 days', '12-month part warranty', 'For dead keys, liquid damage, or uneven key response.'),
              repair('repair-mbp-diagnostic', 'Full Diagnostic Service', 39, 'Same day', 'Diagnostic only', 'Best starting point for power, boot, or board-level issues.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-dell-laptops',
        'dell',
        'Dell',
        'XPS and Inspiron laptop repairs with screens, batteries, DC jacks, and SSD upgrades.',
        [
          model(
            'model-dell-xps-13',
            'xps-13',
            'XPS 13',
            'Premium Windows laptop repairs for display, charging, and performance upgrades.',
            'Same-day diagnostics available',
            [
              repair('repair-xps-screen', 'Screen Replacement', 259, '1 to 2 days', '12-month part warranty', 'Panel replacement with hinge and bezel inspection.'),
              repair('repair-xps-dc', 'Charging Port Repair', 99, 'Same day', '6-month repair warranty', 'For no-charge faults, loose port movement, or power cycling.'),
              repair('repair-xps-ssd', 'SSD Upgrade & Setup', 149, 'Same day', '12-month hardware warranty', 'Includes clone or clean install depending on drive condition.'),
            ],
          ),
          model(
            'model-dell-inspiron-15',
            'inspiron-15',
            'Inspiron 15',
            'General home and work laptop repairs with part-friendly pricing.',
            'Next-slot and same-day options for common faults',
            [
              repair('repair-inspiron-screen', 'Screen Replacement', 149, 'Same day when stock matches', '12-month part warranty', 'For cracked panels, white screen, or lines across display.'),
              repair('repair-inspiron-battery', 'Battery Replacement', 99, 'Same day', '12-month part warranty', 'Suitable for weak battery life and service battery warnings.'),
              repair('repair-inspiron-keyboard', 'Keyboard Replacement', 89, 'Same day', '12-month part warranty', 'For missing keys, liquid spill damage, or no key response.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-lenovo-laptops',
        'lenovo',
        'Lenovo',
        'ThinkPad, ThinkBook, and IdeaPad support for display faults, batteries, keyboards, and storage.',
        [
          model(
            'model-thinkpad-x1',
            'thinkpad-x1-carbon',
            'ThinkPad X1 Carbon',
            'Business laptop service with fast diagnostics and dependable turnaround.',
            'Booked assessments and parts-based repair scheduling',
            [
              repair('repair-x1-screen', 'Screen Replacement', 279, '1 to 2 days', '12-month part warranty', 'Panel, cable, and lid alignment checked during fitting.'),
              repair('repair-x1-battery', 'Battery Replacement', 129, 'Same day', '12-month part warranty', 'For short run time, battery warnings, or charging instability.'),
              repair('repair-x1-os', 'Windows Recovery & Tune-up', 79, 'Same day', '30-day software warranty', 'Includes malware cleanup, updates, and startup optimisation.'),
            ],
          ),
          model(
            'model-ideapad-slim-5',
            'ideapad-slim-5',
            'IdeaPad Slim 5',
            'Popular home-use Lenovo model with strong demand for screen and keyboard repairs.',
            'Same-day diagnostics and next-slot repairs',
            [
              repair('repair-ideapad-screen', 'Screen Replacement', 159, 'Same day when parts match', '12-month part warranty', 'Resolves cracked screens, flicker, and dark display issues.'),
              repair('repair-ideapad-keyboard', 'Keyboard Replacement', 89, 'Same day', '12-month part warranty', 'For sticky, dead, or liquid-damaged keys.'),
              repair('repair-ideapad-battery', 'Battery Replacement', 109, 'Same day', '12-month part warranty', 'Improves short battery life and charging inconsistency.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-hp-laptops',
        'hp',
        'HP',
        'HP Spectre, Pavilion, and office laptop repairs with screens, batteries, keyboards, and charging support.',
        [
          model(
            'model-spectre-x360',
            'spectre-x360',
            'Spectre x360',
            'Premium HP convertible with common display, keyboard, and battery service demand.',
            'Booked diagnostics and same-day maintenance slots',
            [
              repair('repair-spectre-screen', 'Screen Replacement', 289, '1 to 2 days', '12-month part warranty', 'Convertible display replacement with hinge inspection.'),
              repair('repair-spectre-battery', 'Battery Replacement', 139, 'Same day', '12-month part warranty', 'Ideal when battery life drops sharply on convertible use.'),
              repair('repair-spectre-keyboard', 'Keyboard Repair', 129, '1 day', '12-month part warranty', 'For dead keys, spills, and backlight issues.'),
            ],
          ),
          model(
            'model-pavilion-15',
            'pavilion-15',
            'Pavilion 15',
            'High-volume HP model suited to quick screen, keyboard, and battery repairs.',
            'Same-day on many stocked parts',
            [
              repair('repair-pavilion-screen', 'Screen Replacement', 149, 'Same day', '12-month part warranty', 'For cracked LCD panels or black display faults.'),
              repair('repair-pavilion-keyboard', 'Keyboard Replacement', 79, 'Same day', '12-month part warranty', 'For missing keys and liquid-related faults.'),
              repair('repair-pavilion-battery', 'Battery Replacement', 99, 'Same day', '12-month part warranty', 'Suitable for short battery life and service battery messages.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-asus-laptops',
        'asus',
        'Asus',
        'Asus Zenbook and ROG coverage for screens, keyboards, batteries, and performance upgrades.',
        [
          model(
            'model-zenbook-14',
            'zenbook-14',
            'Zenbook 14',
            'Lightweight Asus notebook with frequent display and battery repair demand.',
            'Same-day diagnostics and repair booking slots',
            [
              repair('repair-zenbook-screen', 'Screen Replacement', 229, '1 day', '12-month part warranty', 'For OLED panel damage, flicker, or lid impact faults.'),
              repair('repair-zenbook-battery', 'Battery Replacement', 129, 'Same day', '12-month part warranty', 'Improves battery endurance and charge stability.'),
              repair('repair-zenbook-charge', 'Charging Port Repair', 89, 'Same day', '6-month repair warranty', 'For DC jack looseness or unreliable charging.'),
            ],
          ),
          model(
            'model-rog-g14',
            'rog-zephyrus-g14',
            'ROG Zephyrus G14',
            'Gaming laptop repairs for cooling, screens, keyboards, and SSD upgrades.',
            'Booked diagnostics and next available bench slot',
            [
              repair('repair-rog-cooling', 'Cooling Service & Deep Clean', 89, 'Same day', '30-day service warranty', 'For overheating, fan noise, and throttling under load.'),
              repair('repair-rog-screen', 'Screen Replacement', 269, '1 to 2 days', '12-month part warranty', 'For cracked high-refresh panels or backlight issues.'),
              repair('repair-rog-ssd', 'SSD Upgrade & Setup', 159, 'Same day', '12-month hardware warranty', 'Adds faster storage with setup or clone support.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-acer-laptops',
        'acer',
        'Acer',
        'Acer Swift and Nitro laptop repairs with display, keyboard, battery, and cooling support.',
        [
          model(
            'model-swift-3',
            'swift-3',
            'Swift 3',
            'Portable Acer laptop with common screen and battery issues.',
            'Same-day assessments and common repair slots',
            [
              repair('repair-swift-screen', 'Screen Replacement', 169, 'Same day', '12-month part warranty', 'For cracked LCD panels, white screens, and lid impact damage.'),
              repair('repair-swift-battery', 'Battery Replacement', 109, 'Same day', '12-month part warranty', 'Improves weak runtime and unstable battery behaviour.'),
              repair('repair-swift-keyboard', 'Keyboard Replacement', 85, 'Same day', '12-month part warranty', 'For non-responsive keys and liquid damage.'),
            ],
          ),
          model(
            'model-nitro-5',
            'nitro-5',
            'Nitro 5',
            'Gaming-focused Acer model with fan, screen, and SSD upgrade demand.',
            'Bench diagnostics and booked repair slots available',
            [
              repair('repair-nitro-cooling', 'Cooling Service & Deep Clean', 89, 'Same day', '30-day service warranty', 'For loud fan noise, heat build-up, and gaming shutdowns.'),
              repair('repair-nitro-screen', 'Screen Replacement', 239, '1 to 2 days', '12-month part warranty', 'For cracked or flickering gaming panels.'),
              repair('repair-nitro-ssd', 'SSD Upgrade & Setup', 149, 'Same day', '12-month hardware warranty', 'Adds storage and improves loading times.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-microsoft-laptops',
        'microsoft',
        'Microsoft',
        'Surface laptop and 2-in-1 repair support for displays, batteries, and charging faults.',
        [
          model(
            'model-surface-laptop-5',
            'surface-laptop-5',
            'Surface Laptop 5',
            'Premium Microsoft notebook with display, battery, and charging support.',
            'Booked diagnostics and repair scheduling',
            [
              repair('repair-surface5-screen', 'Screen Replacement', 319, '1 to 2 days', '12-month part warranty', 'High-resolution panel replacement with hinge checks.'),
              repair('repair-surface5-battery', 'Battery Replacement', 169, '1 day', '12-month part warranty', 'For weak battery life, swelling, or inconsistent charging.'),
              repair('repair-surface5-charge', 'Charging Port Repair', 119, 'Same day', '6-month repair warranty', 'Resolves Surface Connect or charging cable issues.'),
            ],
          ),
          model(
            'model-surface-pro-9',
            'surface-pro-9',
            'Surface Pro 9',
            '2-in-1 Microsoft device with display, battery, and keyboard accessory service demand.',
            'Booked repairs and same-day diagnostics',
            [
              repair('repair-surfacepro9-screen', 'Screen Replacement', 339, '1 to 2 days', '12-month part warranty', 'For cracked touch panels and display output faults.'),
              repair('repair-surfacepro9-battery', 'Battery Replacement', 179, '1 day', '12-month part warranty', 'Improves short run time and unstable battery readings.'),
              repair('repair-surfacepro9-diagnostic', 'Full Diagnostic Service', 39, 'Same day', 'Diagnostic only', 'Useful for power, boot, and Type Cover related troubleshooting.'),
            ],
          ),
        ],
      ),
    ],
  ),
  category(
    'category-tablets',
    'tablets',
    'Tablets',
    'Tablet repairs for iPad and Android devices with easy model-based quoting.',
    'Tablet models with repair pricing that stays easy to update',
    'Tablets benefit from the same structure as phones: brand first, model next, then the exact repair. That keeps pricing accurate and lets the admin add new models without touching code.',
    'Walk-in friendly',
    [
      brand(
        'brand-apple-tablets',
        'apple',
        'Apple',
        'iPad glass, display, charging, and battery work for common generations.',
        [
          model(
            'model-ipad-10',
            'ipad-10th-gen',
            'iPad 10th Gen',
            'Popular iPad generation for front glass and charging repairs.',
            'Most jobs booked for same or next day',
            [
              repair('repair-ipad10-glass', 'Front Glass Replacement', 119, '3 to 4 hours', '12-month part warranty', 'Touch layer and digitiser replaced with a clean frame finish.'),
              repair('repair-ipad10-battery', 'Battery Replacement', 109, 'Half day', '12-month part warranty', 'For rapid drain, swelling, or charge drop-off.'),
              repair('repair-ipad10-charge', 'Charging Port Repair', 99, 'Half day', '6-month repair warranty', 'Ideal when the cable is loose or the device only charges intermittently.'),
            ],
          ),
          model(
            'model-ipad-air-5',
            'ipad-air-5',
            'iPad Air 5',
            'Higher-spec iPad repairs for screen, battery, and liquid-related faults.',
            'Booked repairs and diagnostics available',
            [
              repair('repair-air5-screen', 'Screen Replacement', 219, '1 day', '12-month part warranty', 'Display replacement for cracked panel, no image, or touch failure.'),
              repair('repair-air5-battery', 'Battery Replacement', 129, 'Half day', '12-month part warranty', 'Useful for reduced battery endurance or battery swelling.'),
              repair('repair-air5-liquid', 'Liquid Damage Diagnostic', 39, '24 to 48 hours', 'Diagnostic only', 'Board-level inspection with repair quote before continuing.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-samsung-tablets',
        'samsung',
        'Samsung',
        'Galaxy Tab repairs with display, battery, and charging coverage.',
        [
          model(
            'model-tab-s9',
            'galaxy-tab-s9',
            'Galaxy Tab S9',
            'Premium Android tablet repairs for screen and battery issues.',
            'Booked repair slots available',
            [
              repair('repair-tabs9-screen', 'Screen Replacement', 229, '1 day', '12-month part warranty', 'OLED display service with seal and function testing.'),
              repair('repair-tabs9-battery', 'Battery Replacement', 119, 'Half day', '12-month part warranty', 'For weak battery life or thermal-related power loss.'),
              repair('repair-tabs9-charge', 'Charging Port Repair', 99, 'Half day', '6-month repair warranty', 'For cable fit issues and intermittent charge faults.'),
            ],
          ),
          model(
            'model-tab-a9-plus',
            'galaxy-tab-a9-plus',
            'Galaxy Tab A9 Plus',
            'High-volume Samsung tablet repair model for screens, ports, and batteries.',
            'Often finished same or next day',
            [
              repair('repair-taba9-screen', 'Screen Replacement', 149, 'Half day', '12-month part warranty', 'For cracked front panels and dark display faults.'),
              repair('repair-taba9-battery', 'Battery Replacement', 89, 'Half day', '12-month part warranty', 'Improves weak battery life and charge instability.'),
              repair('repair-taba9-charge', 'Charging Port Repair', 79, 'Half day', '6-month repair warranty', 'Fixes damaged charge ports and unreliable USB-C connections.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-lenovo-tablets',
        'lenovo',
        'Lenovo',
        'Lenovo tablet repairs for display, charging, and battery faults across family and business models.',
        [
          model(
            'model-lenovo-p12',
            'tab-p12',
            'Tab P12',
            'Large-screen Lenovo tablet with display and battery repair demand.',
            'Booked same-day diagnostics and half-day repairs',
            [
              repair('repair-p12-screen', 'Screen Replacement', 179, 'Half day', '12-month part warranty', 'For cracked LCD assemblies and touch failure.'),
              repair('repair-p12-battery', 'Battery Replacement', 99, 'Half day', '12-month part warranty', 'Useful when battery health drops or the device drains rapidly.'),
              repair('repair-p12-charge', 'Charging Port Repair', 85, 'Half day', '6-month repair warranty', 'For loose ports or intermittent charging issues.'),
            ],
          ),
          model(
            'model-lenovo-m10-plus',
            'tab-m10-plus',
            'Tab M10 Plus',
            'Family-use Lenovo tablet with common screen, battery, and speaker repairs.',
            'Most jobs turned around within the day',
            [
              repair('repair-m10-screen', 'Screen Replacement', 129, 'Half day', '12-month part warranty', 'For cracked displays, dead touch zones, and image problems.'),
              repair('repair-m10-battery', 'Battery Replacement', 79, 'Half day', '12-month part warranty', 'Improves runtime and stabilises charge behaviour.'),
              repair('repair-m10-speaker', 'Speaker Repair', 55, '60 minutes', '6-month repair warranty', 'For low output and distorted sound.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-amazon-tablets',
        'amazon',
        'Amazon',
        'Fire tablet repairs with practical pricing for glass, battery, and charge faults.',
        [
          model(
            'model-fire-max-11',
            'fire-max-11',
            'Fire Max 11',
            'Large Amazon tablet with screen, battery, and charge repair demand.',
            'Same-day diagnostics and booked repair slots',
            [
              repair('repair-fire11-screen', 'Front Glass Replacement', 119, 'Half day', '12-month part warranty', 'For broken glass and touch digitiser faults.'),
              repair('repair-fire11-battery', 'Battery Replacement', 79, 'Half day', '12-month part warranty', 'Helps with short battery life and charge drop-off.'),
              repair('repair-fire11-charge', 'Charging Port Repair', 69, 'Half day', '6-month repair warranty', 'For damaged charging sockets and unreliable USB-C fit.'),
            ],
          ),
          model(
            'model-fire-hd-10',
            'fire-hd-10',
            'Fire HD 10',
            'Common Amazon tablet for quick repairs on glass, battery, and charge issues.',
            'Usually finished the same day',
            [
              repair('repair-fire10-glass', 'Front Glass Replacement', 99, 'Half day', '12-month part warranty', 'For cracked glass and lost touch response.'),
              repair('repair-fire10-battery', 'Battery Replacement', 69, 'Half day', '12-month part warranty', 'Suitable for short runtime and swelling concerns.'),
              repair('repair-fire10-charge', 'Charging Port Repair', 59, 'Half day', '6-month repair warranty', 'For no-charge and loose charging cable issues.'),
            ],
          ),
        ],
      ),
    ],
  ),
  category(
    'category-consoles',
    'game-consoles',
    'Game Consoles',
    'Console brands and models arranged for HDMI, storage, cooling, and power issues.',
    'Console repair pages that work like the phone catalog',
    'The same admin structure also fits consoles. Pick the brand, choose the model, and present repair options like HDMI port repair, fan service, storage upgrade, or no-power diagnostics.',
    'HDMI and overheating jobs',
    [
      brand(
        'brand-sony-console',
        'sony',
        'Sony',
        'PlayStation repairs for HDMI faults, overheating, storage issues, and no power.',
        [
          model(
            'model-ps5',
            'playstation-5',
            'PlayStation 5',
            'Current-generation console repairs with diagnostics and common port faults.',
            'Diagnostics same day, repair times vary by part',
            [
              repair('repair-ps5-hdmi', 'HDMI Port Repair', 129, '1 day', '6-month repair warranty', 'For no signal, damaged pins, or wobbly HDMI connection.'),
              repair('repair-ps5-clean', 'Cooling Service & Deep Clean', 69, 'Same day', '30-day service warranty', 'Recommended for overheating, loud fan noise, or shutdown during play.'),
              repair('repair-ps5-power', 'No Power Diagnostic', 39, '24 to 48 hours', 'Diagnostic only', 'A safe starting point for motherboard and PSU faults.'),
            ],
          ),
          model(
            'model-ps4',
            'playstation-4',
            'PlayStation 4',
            'Common PS4 issues including overheating, power faults, and storage upgrades.',
            'Most jobs assessed same day',
            [
              repair('repair-ps4-clean', 'Cooling Service & Deep Clean', 59, 'Same day', '30-day service warranty', 'Thermal paste refresh and heavy dust removal included.'),
              repair('repair-ps4-hdmi', 'HDMI Port Repair', 99, '1 day', '6-month repair warranty', 'For bent pins, no video output, or loose HDMI socket.'),
              repair('repair-ps4-storage', 'SSD Upgrade & Setup', 119, 'Same day', '12-month hardware warranty', 'Improves loading times and stability for older consoles.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-nintendo-console',
        'nintendo',
        'Nintendo',
        'Switch repairs with charging, screen, cooling, and dock related faults.',
        [
          model(
            'model-switch-oled',
            'switch-oled',
            'Switch OLED',
            'Portable console repairs with screen, charging, and dock issue coverage.',
            'Most jobs fitted around same-day bench slots',
            [
              repair('repair-switch-oled-screen', 'Screen Replacement', 139, 'Half day', '12-month part warranty', 'For cracked display assemblies or touch issues.'),
              repair('repair-switch-oled-charge', 'Charging Port Repair', 89, 'Half day', '6-month repair warranty', 'For dock connection failure or no-charge symptoms.'),
              repair('repair-switch-oled-fan', 'Cooling Fan Repair', 69, 'Same day', '6-month repair warranty', 'For noise, overheating, or fan failure errors.'),
            ],
          ),
          model(
            'model-switch-lite',
            'switch-lite',
            'Switch Lite',
            'High-volume handheld repairs for screens, charge ports, and joystick-related symptoms.',
            'Same-day diagnostics and repair slots available',
            [
              repair('repair-switchlite-screen', 'Screen Replacement', 119, 'Half day', '12-month part warranty', 'For cracked displays, no image, or touch problems.'),
              repair('repair-switchlite-charge', 'Charging Port Repair', 79, 'Half day', '6-month repair warranty', 'For no-charge and dock related failures.'),
              repair('repair-switchlite-diagnostic', 'Full Diagnostic Service', 29, 'Same day', 'Diagnostic only', 'Useful when the issue is not limited to the display or port.'),
            ],
          ),
        ],
      ),
      brand(
        'brand-microsoft-console',
        'microsoft',
        'Microsoft',
        'Xbox repairs covering HDMI, cooling, storage, and power issues across current and older models.',
        [
          model(
            'model-xbox-series-x',
            'xbox-series-x',
            'Xbox Series X',
            'Modern Xbox console with demand for HDMI, fan, and no-power diagnostics.',
            'Bench diagnostics same day with booked repair slots',
            [
              repair('repair-seriesx-hdmi', 'HDMI Port Repair', 129, '1 day', '6-month repair warranty', 'Fixes no-signal output and damaged HDMI pin sets.'),
              repair('repair-seriesx-cooling', 'Cooling Service & Deep Clean', 69, 'Same day', '30-day service warranty', 'For overheating, loud fan noise, or shutdown during play.'),
              repair('repair-seriesx-power', 'No Power Diagnostic', 39, '24 to 48 hours', 'Diagnostic only', 'Safe starting point for PSU and motherboard fault finding.'),
            ],
          ),
          model(
            'model-xbox-one-s',
            'xbox-one-s',
            'Xbox One S',
            'Older Xbox repairs for HDMI, storage upgrades, and cooling issues.',
            'Common repairs handled on the next available bench slot',
            [
              repair('repair-xboxones-hdmi', 'HDMI Port Repair', 99, '1 day', '6-month repair warranty', 'For no display output and damaged HDMI sockets.'),
              repair('repair-xboxones-storage', 'SSD Upgrade & Setup', 119, 'Same day', '12-month hardware warranty', 'Improves loading times and smooths overall system performance.'),
              repair('repair-xboxones-cooling', 'Cooling Service & Deep Clean', 59, 'Same day', '30-day service warranty', 'For fan noise, overheating, and heavy dust build-up.'),
            ],
          ),
        ],
      ),
    ],
  ),
]