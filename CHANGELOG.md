# Changelog

<!-- 
## [[Unreleased]](https://github.com/bokuweb/re-resizable/compare/v5.0.0-beta.0...master)
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>
</details> -->

<!--
### :rocket: New Feature

### :bug: Bug Fix

### :nail_care: Enhancement
  
### :memo: Documentation
  
### :house: Internal
-->

## [6.1.1 (2019-11-30)](https://github.com/bokuweb/re-resizable/compare/v6.1.0...v6.1.1)

### :bug: Bug Fix

- Fixed a bug, `Handle loses mouse as edge gets further away from other side #537`

## [6.1.0 (2019-09-28)](https://github.com/bokuweb/re-resizable/compare/v6.0.0...v6.1.0)

### :nail_care: Enhancement

- Improve perf #529  
- Support `vh` and `vw` for max size #526

## [6.0.0 (2019-08-12)](https://github.com/bokuweb/re-resizable/compare/v5.0.0...v6.0.0)

### :nail_care: Enhancement

- Fix deprecated componentWillRecieveProps lifecycle method usage #504
- Feature request: Allow early exiting for onResizeStart #494

### :zap: Breaking changes
  
- use `PureComponent`
  
## [5.0.0 (2019-06-05)](https://github.com/bokuweb/re-resizable/compare/v5.0.0-beta.0...v5.0.0)

Please see also 5.0.0-beta.0 change.

### :nail_care: Enhancement
  
- Add `snapGap` property #446
  
### :house: Internal
    
- Upgrade some deps.

## [5.0.0-beta.0 (2019-03-17)](https://github.com/bokuweb/re-resizable/compare/v4.11.0...v5.0.0-beta.0)

### :nail_care: Enhancement
  
- Use typeScript instead of flowtype in [#413]
- Improve some perf.
- Support `vw` and `vh`. Please see [story](https://bokuweb.github.io/re-resizable/?selectedKind=vw%20vh&selectedStory=vw&full=0&addons=1&stories=1&panelRight=0).

### :zap: Breaking changes
  
- Support only named import. Please import like following.
  
```
import { Resizable } from 're-resizable';
```
  
### :memo: Documentation
  
- Extract LICENSE from README file ([@MichaelDeBoey](https://github.com/MichaelDeBoey) in [#397](https://github.com/bokuweb/re-resizable/pull/397))
- Extract CHANGELOG from README file ([@MichaelDeBoey](https://github.com/MichaelDeBoey) in [#397](https://github.com/bokuweb/re-resizable/pull/397))
  
### :house: Internal
- Update `react` & `react-dom` to `v16.7.0` ([#395](https://github.com/bokuweb/re-resizable/pull/395))


## [4.11.0 (2018-12-14)](https://github.com/bokuweb/re-resizable/compare/v4.10.0...v4.11.0)

### :rocket: New Feature
- Add `resizeRatio` prop ([@martinmcneela](https://github.com/martinmcneela) in [#391](https://github.com/bokuweb/re-resizable/pull/391) & [@bokuweb](https://github.com/bokuweb) in [31ce82b2](https://github.com/bokuweb/re-resizable/commit/31ce82b219238de82034c3e8bc8b3acc9cc51dde))
  
### :house: Internal
- Update `npm-run-all` to `v4.1.5` ([#389](https://github.com/bokuweb/re-resizable/pull/389))
- Update `react` & `react-dom` to `v16.6.3` ([#387](https://github.com/bokuweb/re-resizable/pull/387))
- Update `sinon` to `v7.2.2` ([#393](https://github.com/bokuweb/re-resizable/pull/393))
- Update `rollup-plugin-node-resolve` to `v4.0.0` ([#392](https://github.com/bokuweb/re-resizable/pull/392))
- Update `flow-bin` to `v0.89.0` ([#385](https://github.com/bokuweb/re-resizable/pull/385))
- Update `prettier` to `v1.15.3` ([#386](https://github.com/bokuweb/re-resizable/pull/386))

## [4.10.0 (2018-11-16)](https://github.com/bokuweb/re-resizable/compare/v4.9.3...v4.10.0)

### :rocket: New Feature
- Add `scale` prop ([@wootencl](https://github.com/wootencl) in [#391](https://github.com/bokuweb/re-resizable/pull/391) & [@bokuweb](https://github.com/bokuweb) in [6825ed9a](https://github.com/bokuweb/re-resizable/commit/6825ed9a3166fa5c5990ea96852ed1c21e436eb6))
  
### :house: Internal
- Update `react` & `react-dom` to `v16.6.1` ([#384](https://github.com/bokuweb/re-resizable/pull/384))
- Update `prettier` to `v1.15.1` ([#383](https://github.com/bokuweb/re-resizable/pull/383))
- Update `sinon` to `v7.1.1` ([#379](https://github.com/bokuweb/re-resizable/pull/379))
- Update `flow-bin` to `v0.85.0` ([#378](https://github.com/bokuweb/re-resizable/pull/378))
- Update `eslint-plugin-flowtype` to `v3.2.0` ([#375](https://github.com/bokuweb/re-resizable/pull/375))
- Update `rollup-plugin-node-globals` to `v1.4.0` ([#344](https://github.com/bokuweb/re-resizable/pull/344))

## [4.9.3 (2018-11-06)](https://github.com/bokuweb/re-resizable/compare/v4.9.2...v4.9.3)

### :bug: Bug Fix
- Don't add `px` when setting `scale` to `auto` ([@jrainville](https://github.com/jrainville) in [#382](https://github.com/bokuweb/re-resizable/pull/382) & [@bokuweb](https://github.com/bokuweb) in [62254a2b](https://github.com/bokuweb/re-resizable/commit/62254a2b11f7e6a420487d10b41991d8b558edfe))
  
### :house: Internal
- Update `sinon` to `v7.1.0` ([#373](https://github.com/bokuweb/re-resizable/pull/373))
- Update `react` & `react-dom` to `v16.6.0` ([#371](https://github.com/bokuweb/re-resizable/pull/371))
- Update `gh-pages` to `v2.0.1` ([#352](https://github.com/bokuweb/re-resizable/pull/352))
- Update `flow-bin` to `v0.84.0` ([#342](https://github.com/bokuweb/re-resizable/pull/342))

## [4.9.2 (2018-10-26)](https://github.com/bokuweb/re-resizable/compare/v4.9.1...v4.9.2)

### :bug: Bug Fix
- Fix initial left position of element for Safari ([@jnelson180](https://github.com/jnelson180) in [#374](https://github.com/bokuweb/re-resizable/pull/374) & [@bokuweb](https://github.com/bokuweb) in [54d86200](https://github.com/bokuweb/re-resizable/commit/54d86200562fe6f3e95396679264318ee8a9f7c9))
  
### :house: Internal
- Update `eslint-plugin-jsx-a11y` to `v6.1.2` ([#363](https://github.com/bokuweb/re-resizable/pull/363))
- Update `react` & `react-dom` to `v16.5.2` ([#357](https://github.com/bokuweb/re-resizable/pull/357))
- Update `rollup-plugin-commonjs` to `v9.2.0` ([#356](https://github.com/bokuweb/re-resizable/pull/356))
- Update `@​storybook/addon-info` & `@​storybook/react` to `v3.4.11` ([#355](https://github.com/bokuweb/re-resizable/pull/355))

## [4.9.1 (2018-10-21)](https://github.com/bokuweb/re-resizable/compare/v4.9.0...v4.9.1)

### :bug: Bug Fix
- Fix `flow` types ([@amccloud](https://github.com/amccloud) in [#364](https://github.com/bokuweb/re-resizable/pull/364) & [@bokuweb](https://github.com/bokuweb) in [424a208a](https://github.com/bokuweb/re-resizable/commit/424a208a25e07e5bec09ca22bdcbc93708c9e34e))

### :nail_care: Enhancement
- Add defaultStyle to default-size stories ([@liorbentov](https://github.com/liorbentov) in [#361](https://github.com/bokuweb/re-resizable/pull/361))
 
### :memo: Documentation
- Add `Storybook` badge to README ([@bokuweb](https://github.com/bokuweb) in [16458a2d](https://github.com/bokuweb/re-resizable/commit/16458a2dad38699f01592f266471878b40c3f1d8))

### :house: Internal
- Update `rollup` to `v0.65.2` ([#347](https://github.com/bokuweb/re-resizable/pull/347))
- Update `react` & `react-dom` to `v16.5.1` ([#350](https://github.com/bokuweb/re-resizable/pull/350))
- Update `sinon` to `v7.0.0` ([#368](https://github.com/bokuweb/re-resizable/pull/368))
- Update `eslint-plugin-flowtype` to `v3.0.0` ([#367](https://github.com/bokuweb/re-resizable/pull/367))
- Update `rollup-plugin-replace` to `v2.1.0` ([#365](https://github.com/bokuweb/re-resizable/pull/365))
- Update `rollup-plugin-replace` to `v10.0.1` ([#360](https://github.com/bokuweb/re-resizable/pull/360))
- Update `prettier` to `v1.14.3` ([#359](https://github.com/bokuweb/re-resizable/pull/359))

## [4.9.0 (2018-10-13)](https://github.com/bokuweb/re-resizable/compare/v4.8.1...v4.9.0)

### :rocket: New Feature
- Allow relative units for `scale` prop ([@haakemon](https://github.com/liorbentov) in [#349](https://github.com/bokuweb/re-resizable/pull/349))

### :memo: Documentation
- Add `CodeSandbox` (TypeScript) link to README ([@bokuweb](https://github.com/bokuweb) in [e17509a5](https://github.com/bokuweb/re-resizable/commit/e17509a569b630314f9a5b79fea88230035f1928))

### :house: Internal
- Update `rollup` to `v0.65.0` ([#339](https://github.com/bokuweb/re-resizable/pull/339))
- Update `rollup-plugin-commonjs` to `v9.1.6` ([#338](https://github.com/bokuweb/re-resizable/pull/338))
- Update `react` & `react-dom` to `v16.5.0` ([#348](https://github.com/bokuweb/re-resizable/pull/348))
- Update `sinon` to `v6.3.1` ([#345](https://github.com/bokuweb/re-resizable/pull/345))

## [4.8.1 (2018-08-24)](https://github.com/bokuweb/re-resizable/compare/v4.8.0...v4.8.1)

### :bug: Bug Fix
- Fix `TypeScript` types ([@bokuweb](https://github.com/bokuweb) in [22b895b5](https://github.com/bokuweb/re-resizable/commit/22b895b59f35fa473a7c0195b8383d81274760cc) & [55d0eff3](https://github.com/bokuweb/re-resizable/commit/55d0eff3268ff06cfec406b3e34cbb2051357a82))

### :memo: Documentation
- Add `CodeSandbox` link to README ([@bokuweb](https://github.com/bokuweb) in [738edd71](https://github.com/bokuweb/re-resizable/commit/738edd71b97a85823e48b1b1914b5f8a7051c2d7) & [b93fa52e](https://github.com/bokuweb/re-resizable/commit/b93fa52e728ced9e0fcc2276b035fbc558d0e1ba))

### :house: Internal
- Update `flow-bin` to `v0.79.1` ([#336](https://github.com/bokuweb/re-resizable/pull/336))
- Update `sinon` to `v6.1.5` ([#327](https://github.com/bokuweb/re-resizable/pull/327))
- Update `rollup-plugin-babel` to `v3.0.7` ([#305](https://github.com/bokuweb/re-resizable/pull/305))
- Update `rollup` to `v0.64.1` ([#296](https://github.com/bokuweb/re-resizable/pull/296))

## [4.8.0 (2018-08-23)](https://github.com/bokuweb/re-resizable/compare/v4.7.1...v4.8.0)

### :rocket: New Feature
- Add absolute snap dimensions ([@therebelrobot](https://github.com/therebelrobot) in [#337](https://github.com/bokuweb/re-resizable/pull/337) & [@bokuweb](https://github.com/bokuweb) in [e9f0df99](https://github.com/bokuweb/re-resizable/commit/e9f0df99ff85ab70542a4c0d568f57c5e7cca6fb))

### :memo: Documentation
- Change `Greenkeeper` badges to `Renovate` in README ([@bokuweb](https://github.com/bokuweb) in [7903d50e](https://github.com/bokuweb/re-resizable/commit/7903d50e796dce5b4e535ca3858db78269fb4aa0))
- Fix `ResizeCallback` types in README ([@mdanka](https://github.com/mdanka) in [#325](https://github.com/bokuweb/re-resizable/pull/325))

### :house: Internal
- Update `prettier` to `v1.14.2` ([#311](https://github.com/bokuweb/re-resizable/pull/311), [#312](https://github.com/bokuweb/re-resizable/pull/312) & [#329](https://github.com/bokuweb/re-resizable/pull/329))
- Update `flow-bin` to `v0.78.0` ([#298](https://github.com/bokuweb/re-resizable/pull/298), [#320](https://github.com/bokuweb/re-resizable/pull/320), [#326](https://github.com/bokuweb/re-resizable/pull/326) & [#332](https://github.com/bokuweb/re-resizable/pull/332))
- Update `@​storybook/addon-info` & `@​storybook/react` to `v3.4.10` ([#297](https://github.com/bokuweb/re-resizable/pull/297) & [#331](https://github.com/bokuweb/re-resizable/pull/331))
- Update `flow-copy-source` to `v2.0.2` ([#313](https://github.com/bokuweb/re-resizable/pull/313) & [#324](https://github.com/bokuweb/re-resizable/pull/324))
- Update `sinon` to `v6.1.3` ([#309](https://github.com/bokuweb/re-resizable/pull/309), [#314](https://github.com/bokuweb/re-resizable/pull/314) & [#317](https://github.com/bokuweb/re-resizable/pull/317))
- Update `eslint-plugin-react` to `v7.11.1` ([#310](https://github.com/bokuweb/re-resizable/pull/310), [#334](https://github.com/bokuweb/re-resizable/pull/334) & [#335](https://github.com/bokuweb/re-resizable/pull/335))
- Update `eslint-plugin-import` to `v2.14.0` ([#308](https://github.com/bokuweb/re-resizable/pull/308) & [#333](https://github.com/bokuweb/re-resizable/pull/333))
- Update `prettier-eslint` to `v8.8.2` ([#301](https://github.com/bokuweb/re-resizable/pull/301))
- Update `eslint-plugin-jsx-a11y` to `v6.1.1` ([#315](https://github.com/bokuweb/re-resizable/pull/315) & [#323](https://github.com/bokuweb/re-resizable/pull/323))
- Update `babel-eslint` to `v8.2.6` ([#302](https://github.com/bokuweb/re-resizable/pull/302) & [#322](https://github.com/bokuweb/re-resizable/pull/322))
- Update `flow-typed` to `v2.5.1` ([#318](https://github.com/bokuweb/re-resizable/pull/318))
- Update `eslint-plugin-flowtype` to `v2.50.0` ([#321](https://github.com/bokuweb/re-resizable/pull/321))
- Update `react` & `react-dom` to `v16.4.2` ([#330](https://github.com/bokuweb/re-resizable/pull/330))
- Update `rollup-plugin-commonjs` to `v9.1.5` ([#328](https://github.com/bokuweb/re-resizable/pull/328))

## [4.7.1 (2018-06-24)](https://github.com/bokuweb/re-resizable/compare/v4.7.0...v4.7.1)

### :bug: Bug Fix
- Fix behaviour when setting `auto` ([@bokuweb](https://github.com/bokuweb) in [#307](https://github.com/bokuweb/re-resizable/pull/307) &  [ce04f529](https://github.com/bokuweb/re-resizable/commit/ce04f52924f2d085462e2a0be2c2c4592cf290d8))

## [4.7.0 (2018-06-24)](https://github.com/bokuweb/re-resizable/compare/v4.6.1...v4.7.0)

### :bug: Bug Fix
- Fix behaviour when setting absolute position ([@bokuweb](https://github.com/bokuweb) in [#306](https://github.com/bokuweb/re-resizable/pull/306) &  [a64ba810](https://github.com/bokuweb/re-resizable/commit/a64ba8109e05923189004b71ec1e010e09ae9b0a))

## [4.6.1 (2018-06-23)](https://github.com/bokuweb/re-resizable/compare/v4.6.0...v4.6.1)

### :bug: Bug Fix
- Downgrade `rollup`, since it's breaking our build ([@bokuweb](https://github.com/bokuweb) in [#304](https://github.com/bokuweb/re-resizable/pull/304) &  [2daa83aa](https://github.com/bokuweb/re-resizable/commit/2daa83aaa1c31100621fffda48b17c8a05374dc8))

## [4.6.0 (2018-06-23)](https://github.com/bokuweb/re-resizable/compare/v4.5.2...v4.6.0)

**Note: this release has a critical issue and was deprecated. Please update to 4.6.1 or higher.**

### :bug: Bug Fix
- Fix `TypeScript` types ([@bokuweb](https://github.com/bokuweb) in [1db61d42](https://github.com/bokuweb/re-resizable/commit/1db61d42b0c4d33dbbbdde49a84695e70d6cfe2c), [2a02d211](https://github.com/bokuweb/re-resizable/commit/2a02d2111b7c0e7b47c688b633d0249fd0231358) & [27117f46](https://github.com/bokuweb/re-resizable/commit/27117f46be0916eba7012eef1f38b3b13f9d53fc))

## [4.5.2 (2018-06-23)](https://github.com/bokuweb/re-resizable/compare/v4.5.1...v4.5.2)

**Note: this release has a critical issue and was deprecated. Please update to 4.6.1 or higher.**

### :bug: Bug Fix
- Fix `TypeScript` types ([@bokuweb](https://github.com/bokuweb) in [e43e042e](https://github.com/bokuweb/re-resizable/commit/e43e042edcb09f7a5723491de1c6ebb981a7049a) & [af559e74](https://github.com/bokuweb/re-resizable/commit/af559e7462dc5fa366d77b54ca3d0fc5264317fc))

### :house: Internal
- Update `rollup` to `v0.61.0` ([#290](https://github.com/bokuweb/re-resizable/pull/290) & [#295](https://github.com/bokuweb/re-resizable/pull/295))
- Update `@​storybook/addon-info` & `@​storybook/react` to `v3.4.7` ([#288](https://github.com/bokuweb/re-resizable/pull/288))
- Update `prettier` to `v1.13.5` ([#285](https://github.com/bokuweb/re-resizable/pull/285))
- Update `sinon` to `v6.0.0` ([#289](https://github.com/bokuweb/re-resizable/pull/289))
- Update `flow-copy-source` to `v2.0.0` ([#280](https://github.com/bokuweb/re-resizable/pull/280))
- Update `eslint-plugin-react` to `v7.9.1` ([#279](https://github.com/bokuweb/re-resizable/pull/279))
- Update `avaron` to `v0.2.0` ([#300](https://github.com/bokuweb/re-resizable/pull/300))

## [4.5.1 (2018-06-19)](https://github.com/bokuweb/re-resizable/compare/v4.5.0...v4.5.1)

### :bug: Bug Fix
- Fix `TypeScript` types ([@maksis](https://github.com/maksis) in [#293](https://github.com/bokuweb/re-resizable/pull/293) & [@bokuweb](https://github.com/bokuweb) in [e43e042e](https://github.com/bokuweb/re-resizable/commit/e43e042edcb09f7a5723491de1c6ebb981a7049a))

### :house: Internal
- Update `react` & `react-dom` to `v16.4.1` ([#291](https://github.com/bokuweb/re-resizable/pull/291))

## [4.5.0 (2018-06-19)](https://github.com/bokuweb/re-resizable/compare/v4.4.10...v4.5.0)

### :bug: Bug Fix
- Fix `TypeScript` types ([@bokuweb](https://github.com/bokuweb) in [ec3a4b64](https://github.com/bokuweb/re-resizable/commit/ec3a4b64c32484515891375d9dce73ec9d079c23))

### :house: Internal
- Drop Node 6/7 support in  CI ([@bokuweb](https://github.com/bokuweb) in [1b6480cf](https://github.com/bokuweb/re-resizable/commit/1b6480cfae02a2cb8cc10ffb4c571818f48b0d5c))
- Update `flow-bin` to `v0.74.0` ([#284](https://github.com/bokuweb/re-resizable/pull/284))
- Update `sinon` to `v5.1.0` ([#282](https://github.com/bokuweb/re-resizable/pull/282))
- Update `rollup` to `v0.60.1` ([#281](https://github.com/bokuweb/re-resizable/pull/281))

## [4.4.10 (2018-06-07)](https://github.com/bokuweb/re-resizable/compare/v4.4.9...v4.4.10)

### :bug: Bug Fix
- Fix `Array.from` error in IE11 ([@bokuweb](https://github.com/bokuweb) in [6caf5593](https://github.com/bokuweb/re-resizable/commit/6caf559367cf00579fe9203c0694c9cfc7b5799f) & [f1bceab6](https://github.com/bokuweb/re-resizable/commit/f1bceab642cd40d0263e78983e144bbbc2fc937c))

## [4.4.9 (2018-06-07)](https://github.com/bokuweb/re-resizable/compare/v4.4.8...v4.4.9)

### :bug: Bug Fix
- Fix `Array.from` error in IE11 ([@bokuweb](https://github.com/bokuweb) in [#283](https://github.com/bokuweb/re-resizable/pull/283))

### :memo: Documentation
- Change `CodeSandbox` link in README ([@bokuweb](https://github.com/bokuweb) in [d31007dc](https://github.com/bokuweb/re-resizable/commit/d31007dc025df06ffe892ac4907d0639f5d06a47))

### :house: Internal
- Update `sinon` to `v5.0.10` ([#223](https://github.com/bokuweb/re-resizable/pull/223), [#227](https://github.com/bokuweb/re-resizable/pull/227), [#251](https://github.com/bokuweb/re-resizable/pull/251), [#252](https://github.com/bokuweb/re-resizable/pull/252), [#254](https://github.com/bokuweb/re-resizable/pull/254) & [#268](https://github.com/bokuweb/re-resizable/pull/268))
- Use specific Docker image in CI ([#225](https://github.com/bokuweb/re-resizable/pull/225))
- Update `flow-bin` to `v0.73.0` ([#226](https://github.com/bokuweb/re-resizable/pull/226), [#242](https://github.com/bokuweb/re-resizable/pull/242), [#247](https://github.com/bokuweb/re-resizable/pull/247), [#258](https://github.com/bokuweb/re-resizable/pull/258) & [#271](https://github.com/bokuweb/re-resizable/pull/271))
- Update `react` & `react-dom` to `v16.4.0` ([#228](https://github.com/bokuweb/re-resizable/pull/228), [#231](https://github.com/bokuweb/re-resizable/pull/231), [#241](https://github.com/bokuweb/re-resizable/pull/241) & [#269](https://github.com/bokuweb/re-resizable/pull/269))
- Update `eslint-plugin-import` to `v2.12.0` ([#229](https://github.com/bokuweb/re-resizable/pull/229), [#236](https://github.com/bokuweb/re-resizable/pull/236) & [#264](https://github.com/bokuweb/re-resizable/pull/264))
- Update `@​storybook/addon-info` & `@​storybook/react` to `v3.4.6` ([#230](https://github.com/bokuweb/re-resizable/pull/230), [#233](https://github.com/bokuweb/re-resizable/pull/233), [#244](https://github.com/bokuweb/re-resizable/pull/244), [#249](https://github.com/bokuweb/re-resizable/pull/249), [#261](https://github.com/bokuweb/re-resizable/pull/261), [#265](https://github.com/bokuweb/re-resizable/pull/265) & [#272](https://github.com/bokuweb/re-resizable/pull/272))
- Update `prettier` to `v1.13.4` ([#235](https://github.com/bokuweb/re-resizable/pull/235), [#243](https://github.com/bokuweb/re-resizable/pull/243), [#273](https://github.com/bokuweb/re-resizable/pull/273), [#275](https://github.com/bokuweb/re-resizable/pull/275) & [#276](https://github.com/bokuweb/re-resizable/pull/276))
- Update `rollup-plugin-babel` to `v3.0.4` ([#246](https://github.com/bokuweb/re-resizable/pull/246))
- Update `rollup` to `v0.59.4` ([#240](https://github.com/bokuweb/re-resizable/pull/240), [#263](https://github.com/bokuweb/re-resizable/pull/263), [#266](https://github.com/bokuweb/re-resizable/pull/266) & [#270](https://github.com/bokuweb/re-resizable/pull/270))
- Update `eslint-plugin-flowtype` to `v2.49.3` ([#239](https://github.com/bokuweb/re-resizable/pull/239), [#267](https://github.com/bokuweb/re-resizable/pull/267) & [#277](https://github.com/bokuweb/re-resizable/pull/277))
- Update `rollup-plugin-commonjs` to `v9.1.3` ([#250](https://github.com/bokuweb/re-resizable/pull/250))
- Update `babel-eslint` to `v8.2.3` ([#237](https://github.com/bokuweb/re-resizable/pull/237))
- Update `rollup-plugin-node-globals` to `v1.2.1` ([#255](https://github.com/bokuweb/re-resizable/pull/255))
- Update `npm-run-all` to `v4.1.3` ([#253](https://github.com/bokuweb/re-resizable/pull/253))
- Update `babel-preset-env` to `v1.7.0` ([#259](https://github.com/bokuweb/re-resizable/pull/259))
- Update `eslint-plugin-react` to `v7.8.2` ([#260](https://github.com/bokuweb/re-resizable/pull/260) & [#262](https://github.com/bokuweb/re-resizable/pull/262))
- Update `gh-pages` to `v1.2.0` ([#278](https://github.com/bokuweb/re-resizable/pull/278))

## [4.4.8 (2018-03-27)](https://github.com/bokuweb/re-resizable/compare/v4.4.7...v4.4.8)

### :bug: Bug Fix
- Fix for nexted instances ([@bokuweb](https://github.com/bokuweb) in [#222](https://github.com/bokuweb/re-resizable/pull/222) & [064a09d6](https://github.com/bokuweb/re-resizable/commit/064a09d6a5806d923135ff351a9893612476a1b5))

### :house: Internal
- Update `sinon` to `v4.4.9` ([#221](https://github.com/bokuweb/re-resizable/pull/221))

## [4.4.7 (2018-03-26)](https://github.com/bokuweb/re-resizable/compare/v4.4.6...v4.4.7)

### :bug: Bug Fix
- Fix update when no props are passed ([@bokuweb](https://github.com/bokuweb) in [#219](https://github.com/bokuweb/re-resizable/pull/219) & [49422c1b](https://github.com/bokuweb/re-resizable/commit/49422c1b26fbc8336825b2225cdd9931272ff4a3))

### :memo: Documentation
- Change `CodeSandbox` link in README ([@bokuweb](https://github.com/bokuweb) in [0ec36a6e](https://github.com/bokuweb/re-resizable/commit/0ec36a6ea597df272c4a7674c4037ee57d4aade7))

### :house: Internal
- Update `eslint` to `v4.19.1` ([#217](https://github.com/bokuweb/re-resizable/pull/217))
- Update `sinon` to `v4.4.8` ([#216](https://github.com/bokuweb/re-resizable/pull/216))

## [4.4.6 (2018-03-21)](https://github.com/bokuweb/re-resizable/compare/v4.4.5...v4.4.6)

### :bug: Bug Fix
- Use `relative` position as default for `base` ([@bokuweb](https://github.com/bokuweb) in [#213](https://github.com/bokuweb/re-resizable/pull/213) & [f4963eb9](https://github.com/bokuweb/re-resizable/commit/f4963eb96c1421b195671642e80cfa3d91b94e74))

### :house: Internal
- Update `rollup` to `v0.57.1` ([#211](https://github.com/bokuweb/re-resizable/pull/211))
- Update `rollup-plugin-node-resolve` to `v3.3.0` ([#212](https://github.com/bokuweb/re-resizable/pull/212))

## v4.4.5

- chore: upgrade flow-bin

## v4.4.4

- fix: base finder
- fix: add mouse leave

## v4.4.3

- fix: fix type issues in index.d.ts.

## v4.4.2

- fix: fixed bug where base could not be found

## v4.4.1

- fix: add guard to avoid error without parent

## v4.4.0

- fix: bug behavior with flex layout
- chore: refactor
- chore: update deps
- chore: update d.ts
- chore: add some stories

## v4.3.2

- Fixed a bug, when resizing sometimes causes text-selection in some browser #182

## v4.3.1

- Fixed a bug, `auto` overwritten by px value #179

## v4.3.0

- Allow 0 as minWidth and minHeight #178

## v4.2.0

- Add a option for passing custom handle components #170

## v4.1.2

- Fixed a bug, Text select while resizing in IE11 #166

## v4.1.1

- Fixed a bug, Element width id="__resizable0" breaks my layout #162

## v4.1.0

- Additional height and width with lockAspectRatio #163

## v4.0.3

- Use ES5-compatible prototype methods #160

## v4.0.2

- Fix using right click on resize #152
- Add workaround when base Node not found.

## v4.0.1

- Update index.d.ts, Fixes #153

## v4.0.0

- Remove `width` and `height`.
- Add `defaultSize` and `size`,

## v3.0.0

- Fix flowtype annotation.
- Remove `extendsProps`.

You can add extendsProps as follows.

```
<Resizable data-foo="foo" />
```

## v3.0.0-beta.3

- fix typo. `ResizeStartCallBack` -> `ResizeStartCallback`.

## v3.0.0-beta.2

- export `ResizeDirection` type.
- rename `Callback` to `ResizeCallback`.

## v3.0.0-beta.1

- Fix flow filename.
- Change logo

## v3.0.0-beta.0

- Change package name, `react-resizable-box` -> `re-resizable`.
- Add `handleWrapperStyle` and `handleWrapperClass` props.
- Change behavior that is set percentage size to width or height as props.
- Support percentage max/min size.
- Use rollup.
- Fix props name.
  - `handersClasses` -> `handleClasses`
  - `handersStyles` -> `handleStyles`

## v2.1.0

- Remove `shouldUpdateComponent` (#135).
- Remove `lodash.isEqual`.

## v2.0.6

- Update README.

## v2.0.5

- Fix remove event listener

## v2.0.4

- Fix receiveProps. (related #85)

## v2.0.3

- Update dev dependencies.
- Modify index.js.flow.

## v2.0.2

- Remove offset state.
- Use `border-box`.
- Fix boundary size.

## v2.0.1

- Add offset state for rnd component.

## v2.0.0

- Update index.js.flow

## v2.0.0-rc.2

- Use `flowtype`.
- Change callback args.
- Change some props name.
  - isResizable => enable.
  - customClass => className.
  - customStyle => style.
  - handleStyle => handlerStyles.
  - handleClass => handlerClasses.
- Add bounds feature.
- Fix min/max size checker when aspect ratio locked.

## v1.8.4

- Fix cursor

## v1.8.3

- Fix npm readme

## v1.8.2

- Add index.d.ts.
- Fix resize glitch when aspct ratio locked.

## v1.8.1

- Fixing issue on resizing with touch events

## v1.8.0

- Add `extendsProps` prop to other props (e.g. `data-*`, `aria-*`, and other ).

## v1.7.0

- Support siver side rendering #43

## v1.6.0

- Add `updateSize` method.

## v1.5.1

- Add `lockAspectRatio` property.

## v1.4.3

- Avoid unnecessary rendering on resizer

## v1.4.2

- Fix onTouchStart bind timing to avoid re-rendering

## v1.4.1

- Support preserving auto size #40 (thanks @noradaiko)

## v1.4.0

- Add `grid` props to snap grid. (thanks @paulyoung)

## v1.3.0

- Add `userSelect: none` when resize get srated.
- Add shouldComponentUpdate.
- Add handle custom className.

## v1.2.0

- Add module export plugin for `require`.

## v1.1.3

- Update document.

## v1.1.2

- Add size argument to resizeStart callback.
- Fix bug

## v1.1.1

- Fix delta value bug

## v1.1.0

- Add delta argument to onResize and onResizeStop callback.

## v1.0.0

- Rename and add resizer.

## v0.4.2

- Support react v15
- ESLint run when push

## v0.4.1

- Add mousedown event object to `onResizeStart` callback argument.

## v0.4.0

- Support `'px'` and `'%'` for width and height props.
