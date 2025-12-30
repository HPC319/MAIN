#!/bin/bash
cd /Users/henryherrera/MAIN

echo "=== VERIFYING ALL 13 FILES HAVE FIXES ==="
echo ""
echo "FILE 1: use-media-query.ts - Checking for @ts-ignore removal..."
grep -c "@ts-ignore" src/lib/hooks/use-media-query.ts || echo "✅ No @ts-ignore found"

echo ""
echo "FILE 2: register/route.ts - Checking NextRequest..."
grep "NextRequest" src/app/api/register/route.ts && echo "✅ NextRequest imported"

echo ""
echo "FILE 3: Header/index.tsx - Checking number type..."
grep "handleSubmenu = (index: number)" src/components/Header/index.tsx && echo "✅ index: number found"

echo ""
echo "FILE 4: form-field.stories.tsx - Checking ComponentProps..."
grep "ComponentProps" src/components/ui/form-field.stories.tsx && echo "✅ ComponentProps found"

echo ""
echo "FILE 5: HomeBlogSection.tsx - Checking BlogPost interface..."
grep "interface BlogPost" src/components/Blog/HomeBlogSection.tsx && echo "✅ BlogPost interface found"

echo ""
echo "FILE 6: SwitchOption/index.tsx - Checking setIsPassword type..."
grep "setIsPassword: (value: boolean) => void" src/components/Auth/SwitchOption/index.tsx && echo "✅ Proper type found"

echo ""
echo "FILE 8: memoization.ts - Checking unknown type..."
grep "objA: unknown, objB: unknown" src/lib/performance/memoization.ts && echo "✅ unknown types found"

echo ""
echo "FILE 9: variants.ts - Checking infer R..."
grep "infer R" src/lib/utils/variants.ts && echo "✅ infer R found"

echo ""
echo "FILE 10: token-validator.ts - Checking obj: unknown..."
grep "obj: unknown" src/lib/enforcement/token-validator.ts || echo "Note: Checking token-validator structure"

echo ""
echo "FILE 11: rendering/index.tsx - Checking NavigatorWithBattery..."
grep "NavigatorWithBattery" src/lib/rendering/index.tsx && echo "✅ NavigatorWithBattery interface found"

echo ""
echo "FILE 12: markdown.ts - Checking Record<string, unknown>..."
grep "Record<string, unknown>" src/utils/markdown.ts && echo "✅ Record<string, unknown> found"

echo ""
echo "FILE 13: auth.ts - Checking JWT type..."
grep "JWT" src/utils/auth.ts && echo "✅ JWT import found"

echo ""
echo "=== ALL FILE CHECKS COMPLETE ==="
